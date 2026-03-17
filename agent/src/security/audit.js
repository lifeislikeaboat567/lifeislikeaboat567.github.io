/**
 * OpenClaw Agent - Security Layer: Audit Logger
 * 全面的审计日志 - 记录所有重要的系统活动
 */

import { writeFileSync, appendFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const LOG_DIR = './logs';

/**
 * Structured audit logger.
 * Each event is written as a JSON line to ./logs/audit.jsonl.
 */
export class AuditLogger {
  constructor(options = {}) {
    this._logDir = options.logDir || LOG_DIR;
    this._logFile = join(this._logDir, 'audit.jsonl');
    this._console = options.console !== false;
    this._ensureLogDir();
  }

  /**
   * Log a structured audit event.
   * @param {string} category  - e.g. 'AUTH', 'SKILL', 'GATEWAY', 'AGENT'
   * @param {string} action    - e.g. 'LOGIN_SUCCESS', 'SKILL_EXEC', 'PERMISSION_DENIED'
   * @param {object} [data]    - additional metadata
   */
  log(category, action, data = {}) {
    const entry = {
      timestamp: new Date().toISOString(),
      category,
      action,
      ...data,
    };
    this._write(entry);
  }

  /**
   * Log a skill execution event.
   * @param {string} userId
   * @param {string} skillName
   * @param {object} params
   * @param {string} result  - 'success' | 'denied' | 'error'
   * @param {string} [detail]
   */
  logSkillExec(userId, skillName, params, result, detail = '') {
    this.log('SKILL', 'EXEC', { userId, skillName, params, result, detail });
  }

  /**
   * Log an agent decision.
   * @param {string} agentId
   * @param {string} sessionId
   * @param {string} action
   * @param {object} [meta]
   */
  logAgentDecision(agentId, sessionId, action, meta = {}) {
    this.log('AGENT', action, { agentId, sessionId, ...meta });
  }

  /**
   * Log a security event (injection attempt, auth failure, etc.).
   * @param {string} eventType
   * @param {object} [meta]
   */
  logSecurityEvent(eventType, meta = {}) {
    this.log('SECURITY', eventType, meta);
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  _write(entry) {
    const line = JSON.stringify(entry) + '\n';
    try {
      appendFileSync(this._logFile, line, 'utf8');
    } catch {
      // Silently ignore write errors in embedded/test environments
    }
    if (this._console) {
      const { category, action, timestamp, ...rest } = entry;
      const restStr = Object.keys(rest).length ? ' ' + JSON.stringify(rest) : '';
      console.log(`[${timestamp}] [${category}] ${action}${restStr}`);
    }
  }

  _ensureLogDir() {
    try {
      if (!existsSync(this._logDir)) {
        mkdirSync(this._logDir, { recursive: true });
      }
    } catch {
      // Non-fatal
    }
  }
}
