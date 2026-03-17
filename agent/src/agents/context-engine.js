/**
 * OpenClaw Agent - Agent Layer: Context Engine
 * 可插拔的上下文引擎 - 实现"永远不忘"的长上下文记忆管理
 * 基于 lossless-claw 机制：摘要、压缩、持久化
 */

import { ShortTermMemory } from '../memory/short-term.js';
import { LongTermMemory } from '../memory/long-term.js';

/**
 * Context engine that bridges short-term and long-term memory.
 * It feeds contextual facts into each new conversation turn and
 * automatically summarizes overflowing context.
 */
export class ContextEngine {
  /**
   * @param {string} userId
   * @param {object} [options]
   * @param {Function} [options.summarizer]  - async fn(messages) => string
   * @param {object}   [options.stm]         - ShortTermMemory options
   */
  constructor(userId, options = {}) {
    this._userId = userId;
    this._stm = new ShortTermMemory({
      compressor: options.summarizer,
      ...options.stm,
    });
    this._ltm = new LongTermMemory(userId, options.ltm);
  }

  /**
   * Add a message to the context window.
   * @param {{ role: string, content: string }} message
   */
  async addMessage(message) {
    await this._stm.add(message);
  }

  /**
   * Build the full context array for the next LLM call.
   * Includes:
   *  - relevant long-term facts (matched by recent message keywords)
   *  - compressed short-term conversation history
   * @param {string} [userInput] - latest user message (used for fact search)
   * @returns {Array<{role:string, content:string}>}
   */
  buildContext(userInput = '') {
    const relevantFacts = this._findRelevantFacts(userInput);
    const factBlock = relevantFacts.length
      ? [{ role: 'system', content: '[Relevant facts from long-term memory]\n' + relevantFacts.join('\n') }]
      : [];

    const prefs = this._ltm.getAllPreferences();
    const prefKeys = Object.keys(prefs);
    const prefBlock = prefKeys.length
      ? [{ role: 'system', content: '[User preferences]\n' + prefKeys.map(k => `${k}: ${prefs[k]}`).join('\n') }]
      : [];

    return [...prefBlock, ...factBlock, ...this._stm.getContext()];
  }

  /**
   * Persist a completed task result and any extracted facts.
   * @param {object} task
   * @param {string[]} [newFacts]
   */
  async saveTaskResult(task, newFacts = []) {
    this._ltm.saveTaskResult(task);
    for (const fact of newFacts) {
      this._ltm.addFact(fact, ['auto-extracted']);
    }
  }

  /**
   * Update a user preference in long-term memory.
   * @param {string} key
   * @param {*} value
   */
  setPreference(key, value) {
    this._ltm.setPreference(key, value);
  }

  /**
   * Add a fact to long-term memory.
   * @param {string} content
   * @param {string[]} [tags]
   */
  addFact(content, tags) {
    return this._ltm.addFact(content, tags);
  }

  /**
   * Clear the short-term (session) context.
   */
  clearSession() {
    this._stm.clear();
  }

  /**
   * Current short-term message count.
   */
  get sessionSize() {
    return this._stm.size;
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  _findRelevantFacts(query) {
    if (!query) return [];
    // Extract meaningful words (≥ 4 chars)
    const words = query.split(/\W+/).filter(w => w.length >= 4);
    const seen = new Set();
    const results = [];
    for (const word of words.slice(0, 5)) {
      const hits = this._ltm.searchFacts(word);
      for (const hit of hits) {
        if (!seen.has(hit.id)) {
          seen.add(hit.id);
          results.push(hit.content);
        }
      }
    }
    return results.slice(0, 5); // return at most 5 facts
  }
}
