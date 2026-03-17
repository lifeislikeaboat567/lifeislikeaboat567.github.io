/**
 * OpenClaw Agent - Memory Layer: Short-Term Memory
 * 短期记忆 - 存储当前会话的上下文，维持对话的连贯性
 */

/**
 * Short-term memory stores messages for an active session window.
 * When the token budget is exceeded it summarises older messages via
 * a configurable compressor function, implementing the "lossless-claw"
 * pattern of the original OpenClaw context engine.
 */
export class ShortTermMemory {
  /**
   * @param {object} options
   * @param {number} [options.maxMessages=50]       - max raw messages before compaction
   * @param {number} [options.keepRecent=10]        - how many recent messages survive uncompressed
   * @param {Function} [options.compressor]         - async fn(messages) => summaryString
   */
  constructor(options = {}) {
    this._maxMessages = options.maxMessages ?? 50;
    this._keepRecent = options.keepRecent ?? 10;
    this._compressor = options.compressor || null;
    this._messages = [];
    this._summaries = [];
  }

  /**
   * Add a message to short-term memory.
   * @param {{ role: string, content: string }} message
   */
  async add(message) {
    this._messages.push({
      ...message,
      ts: Date.now(),
    });
    if (this._messages.length > this._maxMessages) {
      await this._compact();
    }
  }

  /**
   * Return the current context window as an array of messages.
   * Summaries are prepended as a single "system" summary message.
   * @returns {Array<{role:string, content:string}>}
   */
  getContext() {
    const summaryMessages = this._summaries.length
      ? [{ role: 'system', content: '[Previous context summary]\n' + this._summaries.join('\n') }]
      : [];
    return [...summaryMessages, ...this._messages.map(({ role, content }) => ({ role, content }))];
  }

  /**
   * Clear all messages (e.g. session end).
   */
  clear() {
    this._messages = [];
    this._summaries = [];
  }

  /**
   * Number of stored messages (excludes summaries).
   */
  get size() {
    return this._messages.length;
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  async _compact() {
    const toCompress = this._messages.slice(0, this._messages.length - this._keepRecent);
    this._messages = this._messages.slice(this._messages.length - this._keepRecent);

    if (this._compressor) {
      try {
        const summary = await this._compressor(toCompress);
        this._summaries.push(summary);
      } catch {
        // Fallback: create a simple text summary
        this._summaries.push(this._simpleSummarize(toCompress));
      }
    } else {
      this._summaries.push(this._simpleSummarize(toCompress));
    }
  }

  _simpleSummarize(messages) {
    const lines = messages.map(m => `${m.role}: ${String(m.content).slice(0, 120)}`);
    return `[Previous Context Summary - ${messages.length} messages]\n` + lines.join('\n');
  }
}
