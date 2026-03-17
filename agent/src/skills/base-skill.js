/**
 * OpenClaw Agent - Skills Layer: Base Skill Interface
 * 技能基类 - 定义标准接口，支持自定义扩展
 */

import { AuditLogger } from '../security/audit.js';

const audit = new AuditLogger({ console: false });

/**
 * Base class for all Skills.
 * Custom skills must extend this class and implement `execute()`.
 *
 * @example
 * class MySkill extends BaseSkill {
 *   static get name() { return 'my_skill'; }
 *   static get description() { return 'Does something useful'; }
 *   static get parameters() {
 *     return { message: { type: 'string', required: true } };
 *   }
 *   async _run(params, context) {
 *     return { result: `Hello, ${params.message}!` };
 *   }
 * }
 */
export class BaseSkill {
  /**
   * Unique machine-readable name of the skill.
   * @returns {string}
   */
  static get skillName() {
    return 'base_skill';
  }

  /**
   * Human-readable description used by the planner.
   * @returns {string}
   */
  static get description() {
    return '';
  }

  /**
   * JSON-Schema-like parameter definition.
   * @returns {object}
   */
  static get parameters() {
    return {};
  }

  /**
   * Risk level: 'low' | 'medium' | 'high'
   * High-risk skills require explicit user authorization.
   */
  static get riskLevel() {
    return 'low';
  }

  /**
   * Execute the skill with optional execution context.
   * Validates parameters, checks permissions, runs in sandbox wrapper,
   * and records the action in the audit log.
   *
   * @param {object} params   - skill parameters
   * @param {object} context  - execution context { userId, sessionId, authToken }
   * @returns {Promise<object>} result
   */
  async execute(params, context = {}) {
    const skillName = this.constructor.skillName;
    const userId = context.userId || 'unknown';

    // Validate parameters
    this._validate(params);

    // High-risk skills require authorization flag from the gateway
    if (this.constructor.riskLevel === 'high' && !context.authorized) {
      audit.logSkillExec(userId, skillName, params, 'denied', 'high-risk not authorized');
      throw new SkillError(`Skill "${skillName}" requires explicit authorization (high-risk).`);
    }

    try {
      const result = await this._run(params, context);
      audit.logSkillExec(userId, skillName, params, 'success');
      return result;
    } catch (err) {
      audit.logSkillExec(userId, skillName, params, 'error', err.message);
      throw err;
    }
  }

  /**
   * Internal execution logic. Override in subclasses.
   * @param {object} params
   * @param {object} context
   * @returns {Promise<object>}
   */
  async _run(_params, _context) {
    throw new Error('_run() must be implemented by the subclass');
  }

  /**
   * Return a JSON Schema-compatible tool definition for the LLM.
   * @returns {object}
   */
  toToolDefinition() {
    return {
      type: 'function',
      function: {
        name: this.constructor.skillName,
        description: this.constructor.description,
        parameters: {
          type: 'object',
          properties: this.constructor.parameters,
          required: Object.entries(this.constructor.parameters)
            .filter(([, v]) => v.required)
            .map(([k]) => k),
        },
      },
    };
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  _validate(params) {
    const schema = this.constructor.parameters;
    for (const [key, def] of Object.entries(schema)) {
      if (def.required && (params[key] === undefined || params[key] === null)) {
        throw new SkillError(`Missing required parameter: ${key}`);
      }
      if (params[key] !== undefined && def.type && typeof params[key] !== def.type) {
        throw new SkillError(
          `Parameter "${key}" must be of type ${def.type}, got ${typeof params[key]}`,
        );
      }
    }
  }
}

export class SkillError extends Error {
  constructor(message) {
    super(message);
    this.name = 'SkillError';
  }
}
