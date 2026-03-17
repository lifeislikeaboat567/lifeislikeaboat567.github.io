/**
 * OpenClaw Agent — Main Entry Point
 *
 * This script wires together all four layers:
 *   1. Security: AuthManager
 *   2. Skills: SkillRegistry with built-in skills
 *   3. Agents: CodingAgent, WritingAgent, BaseAgent
 *   4. Gateway: AgentRouter → Gateway (WebSocket + HTTP)
 *
 * Usage:
 *   node src/index.js
 *
 * Environment variables (see .env.example):
 *   PORT         - HTTP/WS port (default: 3000)
 *   LLM_PROVIDER - 'openai' | 'anthropic' | 'ollama'
 *   LLM_API_KEY  - API key for the chosen provider
 *   LLM_MODEL    - model name (default: gpt-4o)
 */

import { Gateway } from './gateway/gateway.js';
import { AgentRouter } from './gateway/router.js';
import { AuthManager } from './security/auth.js';
import { SessionManager } from './gateway/session.js';
import { SkillRegistry } from './skills/api.js';
import { ReadFileSkill, WriteFileSkill, MoveFileSkill, DeleteFileSkill, ListDirectorySkill, CopyFileSkill } from './skills/filesystem.js';
import { ShellSkill } from './skills/shell.js';
import { HttpApiSkill, WeatherSkill } from './skills/api.js';
import { BaseAgent, CodingAgent, WritingAgent } from './agents/base-agent.js';

// ── Load environment config ────────────────────────────────────────────────
let dotenv;
try { dotenv = await import('dotenv'); dotenv.config(); } catch { /* optional */ }

const PORT     = parseInt(process.env.PORT || '3000', 10);
const MODEL    = process.env.LLM_MODEL || 'gpt-4o';
const API_KEY  = process.env.LLM_API_KEY || '';
const PROVIDER = (process.env.LLM_PROVIDER || 'openai').toLowerCase();

// ── LLM Client ────────────────────────────────────────────────────────────
/**
 * Minimal LLM client that supports OpenAI-compatible APIs.
 * Switch provider via LLM_PROVIDER env var.
 */
function createLlmClient(provider, apiKey, model) {
  const endpoints = {
    openai:    'https://api.openai.com/v1/chat/completions',
    anthropic: 'https://api.anthropic.com/v1/messages',
    ollama:    'http://localhost:11434/api/chat',
  };

  const url = endpoints[provider] || endpoints.openai;

  return {
    async chat(messages, tools) {
      if (!apiKey && provider !== 'ollama') {
        // No API key - return a helpful stub response
        return {
          type: 'text',
          content: '⚠️ LLM API key not configured. Set LLM_API_KEY in your .env file to enable real AI responses.',
        };
      }

      const body = {
        model,
        messages: messages.filter(m => m.content !== null || m.tool_calls),
        ...(tools?.length ? { tools, tool_choice: 'auto' } : {}),
      };

      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`LLM API error ${res.status}: ${err}`);
      }

      const data = await res.json();
      const choice = data.choices?.[0];
      if (!choice) throw new Error('Empty LLM response');

      const msg = choice.message;
      if (msg.tool_calls?.length) {
        const tc = msg.tool_calls[0];
        let args;
        try { args = JSON.parse(tc.function.arguments); } catch { args = {}; }
        return {
          type: 'tool_call',
          toolName: tc.function.name,
          toolArgs: args,
          toolCallId: tc.id,
        };
      }

      return { type: 'text', content: msg.content };
    },
  };
}

// ── Skill Registry ────────────────────────────────────────────────────────
const skills = new SkillRegistry();
skills.registerAll([
  ReadFileSkill,
  WriteFileSkill,
  MoveFileSkill,
  DeleteFileSkill,
  ListDirectorySkill,
  CopyFileSkill,
  ShellSkill,
  HttpApiSkill,
  WeatherSkill,
]);

// ── LLM Client ────────────────────────────────────────────────────────────
const llmClient = createLlmClient(PROVIDER, API_KEY, MODEL);

// ── Agents ────────────────────────────────────────────────────────────────
const defaultAgent = new BaseAgent({
  agentId: 'general-agent',
  model: MODEL,
  llmClient,
  skillRegistry: skills,
});

const codingAgent = new CodingAgent({
  model: MODEL,
  llmClient,
  skillRegistry: skills,
});

const writingAgent = new WritingAgent({
  model: MODEL,
  llmClient,
  skillRegistry: skills,
});

// ── Router ────────────────────────────────────────────────────────────────
const router = new AgentRouter();
router
  .register(codingAgent, {
    keywords: ['代码', '编程', 'code', 'debug', 'javascript', 'python', 'function', 'bug', 'error'],
  })
  .register(writingAgent, {
    keywords: ['写作', '文章', '报告', '总结', 'write', 'essay', 'report', 'summarize', 'draft'],
  })
  .register(defaultAgent, { isDefault: true });

// ── Auth ──────────────────────────────────────────────────────────────────
const auth = new AuthManager();
const sessions = new SessionManager();

// Require explicit credentials in production; fall back to safe defaults in dev
const defaultUser = process.env.ADMIN_USER || 'admin';
const defaultPass = process.env.ADMIN_PASS;

if (!defaultPass) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ ADMIN_PASS environment variable must be set in production. Exiting.');
    process.exit(1);
  }
  console.warn('⚠️  ADMIN_PASS not set — using insecure default "changeme". Set ADMIN_PASS before deploying.');
}

auth.registerUser(defaultUser, defaultPass || 'changeme', { roles: ['user', 'admin'] });
auth.registerUser('demo', 'demo', { roles: ['user'] });

// ── Gateway ───────────────────────────────────────────────────────────────
const gateway = new Gateway({
  port: PORT,
  router,
  authManager: auth,
  sessionManager: sessions,
});

// ── Graceful shutdown ─────────────────────────────────────────────────────
process.on('SIGINT', async () => {
  console.log('\n🛑 Shutting down OpenClaw Gateway…');
  await gateway.stop();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await gateway.stop();
  process.exit(0);
});

// ── Start ─────────────────────────────────────────────────────────────────
await gateway.start();

console.log(`\n🦀 OpenClaw Agent System`);
console.log(`   Web UI:     http://localhost:${PORT}`);
console.log(`   WebSocket:  ws://localhost:${PORT}`);
console.log(`   Health:     http://localhost:${PORT}/health`);
console.log(`   LLM:        ${PROVIDER} / ${MODEL}`);
console.log(`   Skills:     ${skills.list().join(', ')}`);
console.log(`   Agents:     ${router.listAgents().map(a => a.agentId).join(', ')}`);
console.log(`\n   Default credentials: ${defaultUser} / ${defaultPass}`);
console.log(`   ⚠️  Change ADMIN_USER and ADMIN_PASS in production!\n`);
