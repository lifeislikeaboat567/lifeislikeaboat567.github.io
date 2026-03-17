/**
 * OpenClaw Agent - Security Layer: Authentication & Session Management
 * 严格的身份认证与会话隔离
 */

import { randomBytes, scryptSync, timingSafeEqual, randomInt } from 'crypto';
import { AuditLogger } from './audit.js';

const audit = new AuditLogger();

/**
 * User authentication manager with multi-factor support.
 */
export class AuthManager {
  constructor() {
    // In production, use a persistent store (database).
    this._users = new Map();
    this._sessions = new Map();
    this._pendingMfa = new Map();
  }

  /**
   * Register a user with hashed credentials.
   * @param {string} userId
   * @param {string} password
   * @param {object} [options]
   * @param {boolean} [options.mfaEnabled]
   */
  registerUser(userId, password, options = {}) {
    const salt = randomBytes(16).toString('hex');
    const hash = this._hashPassword(password, salt);    this._users.set(userId, {
      id: userId,
      hash,
      salt,
      mfaEnabled: options.mfaEnabled || false,
      roles: options.roles || ['user'],
      createdAt: Date.now(),
    });
    audit.log('AUTH', 'USER_REGISTERED', { userId });
  }

  /**
   * Authenticate a user and return a session token.
   * @param {string} userId
   * @param {string} password
   * @param {string} channel - originating channel (e.g. 'web', 'telegram')
   * @returns {{ token: string, requiresMfa: boolean }}
   */
  authenticate(userId, password, channel = 'unknown') {
    const user = this._users.get(userId);
    if (!user) {
      audit.log('AUTH', 'LOGIN_FAILED', { userId, reason: 'unknown_user', channel });
      throw new AuthError('Invalid credentials');
    }
    if (!this._verifyPassword(password, user.salt, user.hash)) {
      audit.log('AUTH', 'LOGIN_FAILED', { userId, reason: 'wrong_password', channel });
      throw new AuthError('Invalid credentials');
    }
    if (user.mfaEnabled) {
      const mfaToken = this._generateMfaToken(userId);
      audit.log('AUTH', 'MFA_REQUIRED', { userId, channel });
      return { token: null, requiresMfa: true, mfaToken };
    }
    const token = this._createSession(userId, channel);
    audit.log('AUTH', 'LOGIN_SUCCESS', { userId, channel });
    return { token, requiresMfa: false };
  }

  /**
   * Complete MFA verification and issue session token.
   * @param {string} userId
   * @param {string} mfaToken   - token from authenticate()
   * @param {string} mfaCode    - code provided by user
   * @param {string} channel
   */
  verifyMfa(userId, mfaToken, mfaCode, channel = 'unknown') {
    const pending = this._pendingMfa.get(userId);
    if (!pending || pending.token !== mfaToken || pending.code !== mfaCode) {
      audit.log('AUTH', 'MFA_FAILED', { userId, channel });
      throw new AuthError('MFA verification failed');
    }
    if (Date.now() > pending.expiresAt) {
      this._pendingMfa.delete(userId);
      throw new AuthError('MFA code expired');
    }
    this._pendingMfa.delete(userId);
    const token = this._createSession(userId, channel);
    audit.log('AUTH', 'MFA_SUCCESS', { userId, channel });
    return { token };
  }

  /**
   * Validate a session token and return session info.
   * @param {string} token
   * @returns {object} session
   */
  validateSession(token) {
    const session = this._sessions.get(token);
    if (!session) throw new AuthError('Invalid or expired session');
    if (Date.now() > session.expiresAt) {
      this._sessions.delete(token);
      throw new AuthError('Session expired');
    }
    // Refresh expiry on activity
    session.expiresAt = Date.now() + 3600_000;
    return session;
  }

  /**
   * Terminate a session.
   * @param {string} token
   */
  logout(token) {
    const session = this._sessions.get(token);
    if (session) {
      audit.log('AUTH', 'LOGOUT', { userId: session.userId });
      this._sessions.delete(token);
    }
  }

  /**
   * Check whether a session has a given role/permission.
   * @param {string} token
   * @param {string} role
   */
  hasRole(token, role) {
    const session = this.validateSession(token);
    const user = this._users.get(session.userId);
    return user?.roles?.includes(role) || false;
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  _hashPassword(password, salt) {
    // scrypt is a memory-hard function suitable for password hashing
    const derived = scryptSync(password, salt, 64);
    return derived.toString('hex');
  }

  _verifyPassword(password, salt, storedHash) {
    const derived = scryptSync(password, salt, 64);
    const storedBuf = Buffer.from(storedHash, 'hex');
    return derived.length === storedBuf.length && timingSafeEqual(derived, storedBuf);
  }

  _createSession(userId, channel) {
    const token = randomBytes(32).toString('hex');
    this._sessions.set(token, {
      token,
      userId,
      channel,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600_000, // 1 hour
    });
    return token;
  }

  _generateMfaToken(userId) {
    const token = randomBytes(16).toString('hex');
    // Use cryptographically secure random number for OTP
    const code = randomInt(100000, 1000000).toString();
    this._pendingMfa.set(userId, {
      token,
      code,
      expiresAt: Date.now() + 300_000, // 5 minutes
    });
    return token;
  }
}

export class AuthError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthError';
  }
}
