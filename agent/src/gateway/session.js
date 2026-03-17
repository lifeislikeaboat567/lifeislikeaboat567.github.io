/**
 * OpenClaw Agent - Gateway Layer: Session Manager
 * 会话管理器 - 负责会话生命周期、上下文隔离
 */

import { randomUUID } from 'crypto';
import { AuditLogger } from '../security/audit.js';

const audit = new AuditLogger({ console: false });

/**
 * Manages active sessions with strict per-user isolation.
 * Each session holds the userId, channel, auth token, and timing info.
 */
export class SessionManager {
  /**
   * @param {object} [options]
   * @param {number} [options.sessionTtl=3600000]  - session TTL in ms (default 1 hour)
   * @param {number} [options.maxPerUser=5]         - max concurrent sessions per user
   */
  constructor(options = {}) {
    this._sessions = new Map();
    this._ttl = options.sessionTtl ?? 3_600_000;
    this._maxPerUser = options.maxPerUser ?? 5;
    // Periodic cleanup
    this._cleanupTimer = setInterval(() => this._cleanExpired(), 60_000);
    this._cleanupTimer.unref?.(); // Don't block Node.js exit
  }

  /**
   * Create a new session.
   * @param {string} userId
   * @param {string} channel - 'web' | 'telegram' | 'discord' | ...
   * @param {string} authToken
   * @returns {object} session
   */
  createSession(userId, channel, authToken) {
    this._enforceSessionLimit(userId);
    const sessionId = randomUUID();
    const session = {
      sessionId,
      userId,
      channel,
      authToken,
      createdAt: Date.now(),
      lastActive: Date.now(),
      expiresAt: Date.now() + this._ttl,
    };
    this._sessions.set(sessionId, session);
    audit.log('SESSION', 'CREATED', { sessionId, userId, channel });
    return session;
  }

  /**
   * Retrieve a session by ID (updates last-active).
   * @param {string} sessionId
   * @returns {object}
   */
  getSession(sessionId) {
    const session = this._sessions.get(sessionId);
    if (!session) throw new SessionError(`Session not found: ${sessionId}`);
    if (Date.now() > session.expiresAt) {
      this._sessions.delete(sessionId);
      throw new SessionError(`Session expired: ${sessionId}`);
    }
    session.lastActive = Date.now();
    session.expiresAt = Date.now() + this._ttl; // rolling window
    return session;
  }

  /**
   * Terminate a session.
   * @param {string} sessionId
   */
  destroySession(sessionId) {
    const session = this._sessions.get(sessionId);
    if (session) {
      audit.log('SESSION', 'DESTROYED', { sessionId, userId: session.userId });
      this._sessions.delete(sessionId);
    }
  }

  /**
   * Return all active sessions for a user (for admin purposes).
   * @param {string} userId
   * @returns {object[]}
   */
  getUserSessions(userId) {
    return [...this._sessions.values()].filter(s => s.userId === userId);
  }

  /**
   * Number of currently active sessions.
   */
  get count() {
    return this._sessions.size;
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  _enforceSessionLimit(userId) {
    const existing = this.getUserSessions(userId);
    if (existing.length >= this._maxPerUser) {
      // Evict the oldest session
      const oldest = existing.sort((a, b) => a.createdAt - b.createdAt)[0];
      this.destroySession(oldest.sessionId);
    }
  }

  _cleanExpired() {
    const now = Date.now();
    for (const [id, session] of this._sessions.entries()) {
      if (now > session.expiresAt) {
        audit.log('SESSION', 'EXPIRED', { sessionId: id, userId: session.userId });
        this._sessions.delete(id);
      }
    }
  }
}

export class SessionError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SessionError';
  }
}
