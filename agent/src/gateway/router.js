/**
 * OpenClaw Agent - Gateway Layer: Agent Router
 * 多Agent路由与管理 - 根据任务类型路由到最合适的Agent
 */

import { AuditLogger } from '../security/audit.js';

const audit = new AuditLogger({ console: false });

/**
 * Routes incoming requests to the appropriate registered agent
 * based on configurable routing rules.
 */
export class AgentRouter {
  constructor() {
    /** @type {Map<string, object>} agentId -> { agent, config } */
    this._agents = new Map();
    /** @type {Array<{match: Function, agentId: string}>} */
    this._rules = [];
    this._defaultAgentId = null;
  }

  /**
   * Register an agent instance with its routing configuration.
   * @param {object} agent              - BaseAgent (or compatible) instance
   * @param {object} [config]
   * @param {boolean} [config.isDefault] - set as the fallback agent
   * @param {string[]} [config.keywords] - keywords that trigger this agent
   * @param {Function} [config.match]    - custom fn(message) => bool
   */
  register(agent, config = {}) {
    const agentId = agent.agentId;
    this._agents.set(agentId, { agent, config });

    if (config.isDefault) {
      this._defaultAgentId = agentId;
    }

    // Build routing rule
    const conditions = [];
    if (config.keywords?.length) {
      const kw = config.keywords.map(k => k.toLowerCase());
      conditions.push(msg => kw.some(k => msg.toLowerCase().includes(k)));
    }
    if (typeof config.match === 'function') {
      conditions.push(config.match);
    }

    if (conditions.length) {
      this._rules.push({
        match: msg => conditions.some(fn => fn(msg)),
        agentId,
      });
    }

    audit.log('ROUTER', 'AGENT_REGISTERED', { agentId, model: agent.model });
    return this;
  }

  /**
   * Resolve which agent should handle a given message.
   * @param {string} message
   * @returns {object} agent instance
   */
  resolve(message) {
    for (const rule of this._rules) {
      if (rule.match(message)) {
        const entry = this._agents.get(rule.agentId);
        if (entry) {
          audit.log('ROUTER', 'ROUTE_MATCHED', { agentId: rule.agentId });
          return entry.agent;
        }
      }
    }
    // Fallback to default agent
    if (this._defaultAgentId) {
      return this._agents.get(this._defaultAgentId).agent;
    }
    if (this._agents.size > 0) {
      return this._agents.values().next().value.agent;
    }
    throw new Error('No agents registered in the router.');
  }

  /**
   * Return a list of all registered agent IDs and models.
   * @returns {Array<{agentId:string, model:string}>}
   */
  listAgents() {
    return [...this._agents.values()].map(({ agent }) => ({
      agentId: agent.agentId,
      model: agent.model,
    }));
  }
}
