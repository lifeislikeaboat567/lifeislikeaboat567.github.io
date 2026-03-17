/**
 * OpenClaw Agent - Channel Access Layer: Channel Adapters
 * 渠道接入层 - 多消息渠道适配器
 *
 * Each adapter translates platform-specific messages into the
 * standard internal format and forwards them to the Gateway via WebSocket.
 */

/**
 * Base channel adapter. All channel adapters extend this class.
 */
export class BaseChannel {
  /**
   * @param {string} channelName  - human-readable channel name
   * @param {string} gatewayUrl   - WebSocket URL of the Gateway
   */
  constructor(channelName, gatewayUrl) {
    this._name = channelName;
    this._gatewayUrl = gatewayUrl;
  }

  get name() { return this._name; }

  /**
   * Start the channel adapter (connect to the platform).
   * Override in subclasses.
   * @returns {Promise<void>}
   */
  async start() {
    throw new Error(`start() not implemented in ${this.constructor.name}`);
  }

  /**
   * Stop the channel adapter.
   * @returns {Promise<void>}
   */
  async stop() {}

  /**
   * Normalize a platform-specific message into the standard format.
   * @param {*} rawMessage - platform-specific message object
   * @returns {{ userId: string, text: string, metadata: object }}
   */
  normalizeMessage(_rawMessage) {
    throw new Error(`normalizeMessage() not implemented in ${this.constructor.name}`);
  }

  /**
   * Send a reply back to the platform user.
   * @param {string} userId
   * @param {string} text
   * @returns {Promise<void>}
   */
  async sendReply(_userId, _text) {
    throw new Error(`sendReply() not implemented in ${this.constructor.name}`);
  }
}

// ── Telegram Channel ──────────────────────────────────────────────────────────

/**
 * Telegram channel adapter.
 * In production, use the Telegram Bot API polling or webhook.
 */
export class TelegramChannel extends BaseChannel {
  /**
   * @param {object} config
   * @param {string} config.botToken
   * @param {string} [config.gatewayUrl]
   */
  constructor(config) {
    super('telegram', config.gatewayUrl || 'ws://localhost:3000');
    this._botToken = config.botToken;
    this._polling = null;
    this._lastUpdateId = 0;
  }

  async start() {
    console.log('[Telegram] Starting polling...');
    this._polling = setInterval(() => this._poll(), 2000);
  }

  async stop() {
    if (this._polling) clearInterval(this._polling);
  }

  normalizeMessage(update) {
    const msg = update.message;
    return {
      userId: `telegram:${msg.from.id}`,
      text: msg.text || '',
      metadata: { chatId: msg.chat.id, firstName: msg.from.first_name },
    };
  }

  async sendReply(userId, text) {
    const chatId = userId.replace('telegram:', '');
    const url = `https://api.telegram.org/bot${this._botToken}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  }

  async _poll() {
    try {
      const res = await fetch(
        `https://api.telegram.org/bot${this._botToken}/getUpdates?offset=${this._lastUpdateId + 1}&timeout=1`,
      );
      const data = await res.json();
      for (const update of data.result || []) {
        this._lastUpdateId = update.update_id;
        if (update.message?.text) {
          const normalized = this.normalizeMessage(update);
          this._onMessage(normalized);
        }
      }
    } catch {
      // Network errors during polling are non-fatal
    }
  }

  _onMessage(normalized) {
    // In the full implementation, this forwards to the Gateway WebSocket.
    console.log('[Telegram] Message from', normalized.userId, ':', normalized.text);
  }
}

// ── Discord Channel ───────────────────────────────────────────────────────────

/**
 * Discord channel adapter stub.
 * In production, wire to discord.js Client events.
 */
export class DiscordChannel extends BaseChannel {
  constructor(config) {
    super('discord', config.gatewayUrl || 'ws://localhost:3000');
    this._token = config.token;
  }

  async start() {
    console.log('[Discord] Channel adapter ready (stub - wire discord.js here).');
  }

  normalizeMessage(discordMsg) {
    return {
      userId: `discord:${discordMsg.author.id}`,
      text: discordMsg.content || '',
      metadata: { guildId: discordMsg.guildId, channelId: discordMsg.channelId },
    };
  }

  async sendReply(userId, text) {
    // In production, use the Discord REST API to send a DM or channel message
    console.log(`[Discord] → ${userId}: ${text}`);
  }
}

// ── Slack Channel ─────────────────────────────────────────────────────────────

/**
 * Slack channel adapter stub.
 * In production, use Bolt for JavaScript.
 */
export class SlackChannel extends BaseChannel {
  constructor(config) {
    super('slack', config.gatewayUrl || 'ws://localhost:3000');
    this._token = config.token;
    this._signingSecret = config.signingSecret;
  }

  async start() {
    console.log('[Slack] Channel adapter ready (stub - wire @slack/bolt here).');
  }

  normalizeMessage(event) {
    return {
      userId: `slack:${event.user}`,
      text: event.text || '',
      metadata: { channel: event.channel, ts: event.ts },
    };
  }

  async sendReply(userId, text) {
    console.log(`[Slack] → ${userId}: ${text}`);
  }
}

// ── Web Channel ───────────────────────────────────────────────────────────────

/**
 * Web channel adapter.
 * The Web UI connects directly over WebSocket, so this adapter is a thin wrapper
 * that documents the protocol.
 */
export class WebChannel extends BaseChannel {
  constructor(config = {}) {
    super('web', config.gatewayUrl || 'ws://localhost:3000');
  }

  async start() {
    console.log('[Web] Channel ready - clients connect directly via WebSocket.');
  }

  normalizeMessage(wsPayload) {
    return {
      userId: wsPayload.userId,
      text: wsPayload.message,
      metadata: { sessionId: wsPayload.sessionId },
    };
  }

  async sendReply(_userId, _text) {
    // Replies are pushed over the same WebSocket connection by the Gateway
  }
}
