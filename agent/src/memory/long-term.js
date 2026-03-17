/**
 * OpenClaw Agent - Memory Layer: Long-Term Memory
 * 长期记忆 - 持久化用户偏好、知识和历史任务结果
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const MEMORY_DIR = './data/memory';

/**
 * Long-term memory backed by JSON files on disk.
 * Stores facts, user preferences, and task history persistently.
 * Each user has an isolated memory store.
 */
export class LongTermMemory {
  /**
   * @param {string} userId   - scopes the memory to a specific user
   * @param {object} [options]
   * @param {string} [options.dataDir] - override storage directory
   */
  constructor(userId, options = {}) {
    this._userId = userId;
    this._dataDir = join(options.dataDir || MEMORY_DIR, userId);
    this._preferencesFile = join(this._dataDir, 'preferences.json');
    this._factsFile = join(this._dataDir, 'facts.json');
    this._historyFile = join(this._dataDir, 'task_history.json');
    this._ensureDir();
    this._preferences = this._load(this._preferencesFile, {});
    this._facts = this._load(this._factsFile, []);
    this._history = this._load(this._historyFile, []);
  }

  // ── Preferences ────────────────────────────────────────────────────────────

  /**
   * Set a user preference key-value pair.
   * @param {string} key
   * @param {*} value
   */
  setPreference(key, value) {
    this._preferences[key] = value;
    this._save(this._preferencesFile, this._preferences);
  }

  /**
   * Get a user preference value.
   * @param {string} key
   * @param {*} [defaultValue]
   * @returns {*}
   */
  getPreference(key, defaultValue = undefined) {
    return Object.prototype.hasOwnProperty.call(this._preferences, key)
      ? this._preferences[key]
      : defaultValue;
  }

  /**
   * Return all preferences.
   * @returns {object}
   */
  getAllPreferences() {
    return { ...this._preferences };
  }

  // ── Facts ──────────────────────────────────────────────────────────────────

  /**
   * Store a knowledge fact with optional tags.
   * @param {string} content
   * @param {string[]} [tags]
   * @returns {string} fact id
   */
  addFact(content, tags = []) {
    const fact = {
      id: `fact_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
      content,
      tags,
      createdAt: new Date().toISOString(),
    };
    this._facts.push(fact);
    this._save(this._factsFile, this._facts);
    return fact.id;
  }

  /**
   * Search facts by tag or keyword.
   * @param {string} query
   * @returns {Array}
   */
  searchFacts(query) {
    const q = query.toLowerCase();
    return this._facts.filter(
      f =>
        f.content.toLowerCase().includes(q) ||
        f.tags.some(t => t.toLowerCase().includes(q)),
    );
  }

  /**
   * Remove a fact by id.
   * @param {string} factId
   */
  removeFact(factId) {
    this._facts = this._facts.filter(f => f.id !== factId);
    this._save(this._factsFile, this._facts);
  }

  // ── Task History ───────────────────────────────────────────────────────────

  /**
   * Persist a completed task record.
   * @param {object} task - { goal, steps, result, agentId }
   */
  saveTaskResult(task) {
    const record = {
      id: `task_${Date.now()}`,
      ...task,
      savedAt: new Date().toISOString(),
    };
    this._history.push(record);
    // Keep at most 1000 records to avoid unbounded growth
    if (this._history.length > 1000) {
      this._history = this._history.slice(-1000);
    }
    this._save(this._historyFile, this._history);
    return record.id;
  }

  /**
   * Return recent task history.
   * @param {number} [limit=20]
   * @returns {Array}
   */
  getRecentHistory(limit = 20) {
    return this._history.slice(-limit);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  _ensureDir() {
    try {
      if (!existsSync(this._dataDir)) {
        mkdirSync(this._dataDir, { recursive: true });
      }
    } catch {
      // Non-fatal in read-only environments
    }
  }

  _load(file, defaultValue) {
    try {
      if (existsSync(file)) {
        return JSON.parse(readFileSync(file, 'utf8'));
      }
    } catch {
      // Corrupted file - start fresh
    }
    return defaultValue;
  }

  _save(file, data) {
    try {
      writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
    } catch {
      // Non-fatal in read-only environments
    }
  }
}
