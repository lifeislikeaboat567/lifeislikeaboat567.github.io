/**
 * OpenClaw Agent - Agent Layer: Base Agent & Task Planner
 * 智能体基类与任务规划器 - 实现"思考-行动-观察"的 ReAct 循环
 */

import { ContextEngine } from './context-engine.js';
import { InputSanitizer, OutputFilter } from '../security/sanitizer.js';
import { AuditLogger } from '../security/audit.js';

const audit = new AuditLogger({ console: false });

const DEFAULT_SYSTEM_PROMPT = `You are OpenClaw, a capable AI agent.
You think step by step and use available tools to complete user goals.
When you need to perform an action, call the appropriate tool.
After each tool result, reflect on the outcome and decide the next step.
When the task is complete, respond with a clear final answer.`;

/**
 * Base Agent class.
 * Subclass this to create specialised agents (e.g. CodingAgent, WritingAgent).
 */
export class BaseAgent {
  /**
   * @param {object} config
   * @param {string} config.agentId         - unique identifier
   * @param {string} [config.model]         - LLM model name
   * @param {string} [config.systemPrompt]  - override default system prompt
   * @param {object} config.llmClient       - object with { chat(messages, tools) => Promise }
   * @param {object} config.skillRegistry   - SkillRegistry instance
   * @param {number} [config.maxIterations] - safety limit for ReAct loop
   */
  constructor(config) {
    if (!config.llmClient) throw new Error('llmClient is required');
    if (!config.skillRegistry) throw new Error('skillRegistry is required');
    this._agentId = config.agentId || `agent_${Date.now()}`;
    this._model = config.model || 'gpt-4o';
    this._systemPrompt = config.systemPrompt || DEFAULT_SYSTEM_PROMPT;
    this._llm = config.llmClient;
    this._skills = config.skillRegistry;
    this._maxIterations = config.maxIterations || 20;
    this._contextEngines = new Map(); // sessionId -> ContextEngine
  }

  get agentId() { return this._agentId; }
  get model() { return this._model; }

  /**
   * Process a user message within a session (ReAct loop).
   * @param {string} userMessage
   * @param {object} context - { userId, sessionId, authToken, authorized?, workspace? }
   * @returns {Promise<{ response: string, steps: Array }>}
   */
  async chat(userMessage, context) {
    const { userId, sessionId } = context;

    // --- Input sanitization ---
    const { cleaned, safe, violations } = InputSanitizer.process(userMessage);
    if (!safe) {
      audit.logSecurityEvent('INPUT_INJECTION_DETECTED', { userId, sessionId, violations });
      return {
        response: '⚠️ Your message was flagged as potentially unsafe and was not processed.',
        steps: [],
      };
    }

    // Get or create context engine for this session
    const ctxEngine = this._getContextEngine(userId, sessionId);
    await ctxEngine.addMessage({ role: 'user', content: cleaned });

    const systemMsg = { role: 'system', content: this._systemPrompt };
    const tools = this._skills.getToolDefinitions();
    const steps = [];
    let finalResponse = null;

    for (let i = 0; i < this._maxIterations; i++) {
      const messages = [systemMsg, ...ctxEngine.buildContext(cleaned)];
      audit.logAgentDecision(this._agentId, sessionId, 'LLM_CALL', { iteration: i });

      const llmResponse = await this._llm.chat(messages, tools);

      if (llmResponse.type === 'text') {
        finalResponse = llmResponse.content;
        break;
      }

      if (llmResponse.type === 'tool_call') {
        const { toolName, toolArgs, toolCallId } = llmResponse;
        steps.push({ type: 'tool_call', toolName, toolArgs });
        audit.logAgentDecision(this._agentId, sessionId, 'TOOL_CALL', { toolName });

        let toolResult;
        try {
          toolResult = await this._skills.execute(toolName, toolArgs, context);
        } catch (err) {
          toolResult = { error: err.message };
        }

        steps.push({ type: 'tool_result', toolName, result: toolResult });

        // Add tool interaction to context
        await ctxEngine.addMessage({
          role: 'assistant',
          content: null,
          tool_calls: [{ id: toolCallId, type: 'function', function: { name: toolName, arguments: JSON.stringify(toolArgs) } }],
        });
        await ctxEngine.addMessage({
          role: 'tool',
          tool_call_id: toolCallId,
          content: JSON.stringify(toolResult),
        });
      }
    }

    if (!finalResponse) {
      finalResponse = 'Task reached maximum iteration limit without a final answer.';
    }

    // --- Output filtering ---
    const { filtered } = OutputFilter.process(finalResponse);
    await ctxEngine.addMessage({ role: 'assistant', content: filtered });

    return { response: filtered, steps };
  }

  /**
   * End a session and optionally save task results.
   * @param {string} sessionId
   * @param {object} [taskSummary]
   */
  async endSession(sessionId, taskSummary = null) {
    const engine = this._contextEngines.get(sessionId);
    if (engine) {
      if (taskSummary) await engine.saveTaskResult(taskSummary);
      engine.clearSession();
      this._contextEngines.delete(sessionId);
    }
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  _getContextEngine(userId, sessionId) {
    if (!this._contextEngines.has(sessionId)) {
      this._contextEngines.set(sessionId, new ContextEngine(userId));
    }
    return this._contextEngines.get(sessionId);
  }
}

/**
 * Specialised coding agent.
 */
export class CodingAgent extends BaseAgent {
  constructor(config) {
    super({
      ...config,
      agentId: config.agentId || 'coding-agent',
      systemPrompt:
        'You are a senior software engineer AI assistant. ' +
        'You write clean, well-documented code and use filesystem and shell tools to help users with programming tasks.',
    });
  }
}

/**
 * Specialised writing / research agent.
 */
export class WritingAgent extends BaseAgent {
  constructor(config) {
    super({
      ...config,
      agentId: config.agentId || 'writing-agent',
      systemPrompt:
        'You are an expert writing and research assistant. ' +
        'You help users draft documents, summarize content, and conduct research using available tools.',
    });
  }
}
