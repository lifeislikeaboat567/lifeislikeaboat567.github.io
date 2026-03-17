/**
 * OpenClaw Agent — Web Control UI Application
 * Connects to the Gateway via WebSocket and provides a full management interface.
 */

// ═══════════════════════════════════════════════════════════════ State
const state = {
  ws: null,
  sessionId: null,
  token: null,
  userId: null,
  connected: false,
  thinking: false,
  settings: loadSettings(),
};

// ═══════════════════════════════════════════════════════════════ Skills catalogue
const BUILTIN_SKILLS = [
  { name: 'read_file',       desc: '读取工作区内文件内容',              risk: 'low',    icon: '📄' },
  { name: 'write_file',      desc: '写入/创建工作区文件',               risk: 'medium', icon: '✏️' },
  { name: 'move_file',       desc: '移动或重命名文件',                  risk: 'medium', icon: '📦' },
  { name: 'delete_file',     desc: '删除工作区文件（需授权）',           risk: 'high',   icon: '🗑️' },
  { name: 'list_directory',  desc: '列出目录内容',                      risk: 'low',    icon: '📁' },
  { name: 'copy_file',       desc: '复制文件',                          risk: 'medium', icon: '📋' },
  { name: 'shell_exec',      desc: '执行 Shell 命令（沙箱，需授权）',    risk: 'high',   icon: '💻' },
  { name: 'http_api',        desc: '发起 HTTP API 请求',                risk: 'medium', icon: '🌐' },
  { name: 'get_weather',     desc: '查询指定坐标的天气信息',             risk: 'low',    icon: '🌤️' },
];

const RISK_COLORS = { low: 'badge-green', medium: 'badge-blue', high: 'badge-red' };
const RISK_LABELS = { low: '低风险', medium: '中风险', high: '高风险' };

// ═══════════════════════════════════════════════════════════════ DOM helpers
const $ = id => document.getElementById(id);
const el = (tag, cls, html) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (html !== undefined) e.innerHTML = html;
  return e;
};

// ═══════════════════════════════════════════════════════════════ Init
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initChat();
  initSkills();
  initSettings();
  initSidebar();
  setConnectionStatus('disconnected');
  $('loginOverlay').classList.remove('hidden');
});

// ═══════════════════════════════════════════════════════════════ Navigation
function initNav() {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault();
      const viewId = item.dataset.view;
      switchView(viewId);
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
    });
  });
}

function switchView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const v = $(`view-${viewId}`);
  if (v) v.classList.add('active');
}

// ═══════════════════════════════════════════════════════════════ Sidebar toggle
function initSidebar() {
  $('sidebarToggle').addEventListener('click', () => {
    const sidebar = $('sidebar');
    sidebar.style.width = sidebar.style.width === '60px' ? '' : '60px';
  });
}

// ═══════════════════════════════════════════════════════════════ WebSocket & Auth
$('loginBtn').addEventListener('click', () => {
  const userId = $('loginUser').value.trim() || 'demo';
  const password = $('loginPass').value || 'demo';
  const gatewayUrl = $('gatewayUrl').value.trim() || 'ws://localhost:3000';
  connect(gatewayUrl, userId, password);
});

function connect(url, userId, password) {
  if (state.ws) { state.ws.close(); }

  setConnectionStatus('connecting');
  addLog('info', `正在连接 ${url}…`);

  try {
    state.ws = new WebSocket(url);
  } catch {
    // Gateway not available - use demo mode
    enterDemoMode(userId);
    return;
  }

  state.ws.addEventListener('open', () => {
    setConnectionStatus('connected');
    addLog('auth', '连接成功，正在认证…');
    wsSend('auth', { userId, password, channel: 'web' });
    state.userId = userId;
  });

  state.ws.addEventListener('message', e => {
    let msg;
    try { msg = JSON.parse(e.data); } catch { return; }
    handleServerMessage(msg);
  });

  state.ws.addEventListener('close', () => {
    setConnectionStatus('disconnected');
    addLog('warn', '连接已断开');
    state.connected = false;
    $('chatInput').disabled = true;
    $('sendBtn').disabled = true;
  });

  state.ws.addEventListener('error', () => {
    addLog('warn', '无法连接 Gateway，进入演示模式');
    state.ws = null;
    enterDemoMode(userId);
  });
}

function handleServerMessage({ type, payload }) {
  switch (type) {
    case 'auth_result':
      if (payload.requiresMfa) {
        const code = prompt('请输入 MFA 验证码:');
        if (code) wsSend('mfa_verify', { mfaToken: payload.mfaToken, mfaCode: code });
      } else {
        state.sessionId = payload.sessionId;
        state.token = payload.token;
        onAuthenticated();
      }
      break;

    case 'chat_response':
      hideThinking();
      appendMessage('assistant', payload.response, payload.steps);
      state.thinking = false;
      $('sendBtn').disabled = false;
      break;

    case 'error':
      hideThinking();
      appendSystemMessage(`⚠️ ${payload.message}`);
      state.thinking = false;
      $('sendBtn').disabled = false;
      break;

    case 'ping':
      // keepalive - no action needed
      break;
  }
}

function wsSend(type, payload) {
  if (state.ws?.readyState === WebSocket.OPEN) {
    state.ws.send(JSON.stringify({ type, payload }));
  }
}

// ═══════════════════════════════════════════════════════════════ Demo mode
/**
 * Demo mode: simulate responses locally when Gateway is unavailable.
 */
function enterDemoMode(userId) {
  state.connected = true;
  state.sessionId = 'demo-session';
  state.userId = userId;
  setConnectionStatus('connected', '演示模式');
  onAuthenticated();
  addLog('warn', '演示模式 - Gateway 未连接，响应为模拟数据');
}

const DEMO_RESPONSES = [
  {
    match: /(文件|file|目录|directory|ls)/i,
    response: '📁 已列出工作区文件:\n• README.md (1.2 KB)\n• src/main.js (4.5 KB)\n• package.json (0.8 KB)',
    steps: [{ type: 'tool_call', toolName: 'list_directory', toolArgs: { path: '.' } }],
  },
  {
    match: /(天气|weather)/i,
    response: '🌤️ 当前天气:\n温度: 22°C\n风速: 15 km/h\n数据来源: open-meteo.com',
    steps: [{ type: 'tool_call', toolName: 'get_weather', toolArgs: { latitude: 39.9, longitude: 116.4 } }],
  },
  {
    match: /(代码|code|python|javascript|js)/i,
    response: '💻 这是一段 Python 示例:\n```python\ndef fibonacci(n):\n    if n <= 1:\n        return n\n    return fibonacci(n-1) + fibonacci(n-2)\n\nprint(fibonacci(10))  # 55\n```',
    steps: [],
  },
  {
    match: /(你好|hello|hi|嗨)/i,
    response: '👋 你好！我是 OpenClaw Agent，我可以帮助你：\n• 📁 文件系统操作\n• 💻 执行命令\n• 🌐 API调用\n• 🧠 知识管理\n\n请告诉我你需要什么帮助！',
    steps: [],
  },
];

async function demoChat(message) {
  await sleep(800 + Math.random() * 600);
  for (const { match, response, steps } of DEMO_RESPONSES) {
    if (match.test(message)) return { response, steps };
  }
  return {
    response: `我理解你的请求："${message}"\n\n在真实部署中，我会通过 ReAct 循环分析任务，调用合适的技能（Skills）来完成它。当前处于演示模式，Gateway 未连接。\n\n请启动 Gateway 以使用完整功能。`,
    steps: [],
  };
}

// ═══════════════════════════════════════════════════════════════ Post-auth
function onAuthenticated() {
  $('loginOverlay').classList.add('hidden');
  $('chatInput').disabled = false;
  $('sendBtn').disabled = false;
  addLog('auth', `用户 ${state.userId} 认证成功`);

  // Welcome message
  appendSystemMessage(`✅ 已连接。用户: **${state.userId}** | 会话: ${state.sessionId?.slice(0, 8)}…`);
}

// ═══════════════════════════════════════════════════════════════ Chat
function initChat() {
  const input = $('chatInput');
  const sendBtn = $('sendBtn');

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 160) + 'px';
  });

  sendBtn.addEventListener('click', sendMessage);

  $('clearChatBtn').addEventListener('click', () => {
    $('chatMessages').innerHTML = '';
    appendSystemMessage('对话已清空');
    if (state.ws) wsSend('end_session', {});
  });
}

function sendMessage() {
  if (state.thinking) return;
  const input = $('chatInput');
  const text = input.value.trim();
  if (!text) return;

  appendMessage('user', text);
  input.value = '';
  input.style.height = 'auto';

  state.thinking = true;
  $('sendBtn').disabled = true;
  showThinking();

  if (state.ws?.readyState === WebSocket.OPEN) {
    wsSend('chat', { message: text });
  } else {
    // Demo mode
    demoChat(text).then(({ response, steps }) => {
      hideThinking();
      appendMessage('assistant', response, steps);
      state.thinking = false;
      $('sendBtn').disabled = false;
    });
  }
}

function appendMessage(role, content, steps = []) {
  const welcome = $('chatMessages').querySelector('.chat-welcome');
  if (welcome) welcome.remove();

  const wrap = el('div', `msg ${role}`);
  const bubble = el('div', 'msg-bubble', escapeHtml(content).replace(/\n/g, '<br>'));
  wrap.appendChild(bubble);

  if (steps.length) {
    const calls = steps.filter(s => s.type === 'tool_call');
    if (calls.length) {
      const det = el('details', 'tool-steps');
      det.innerHTML = `<summary>🛠️ 使用了 ${calls.length} 个工具</summary>`;
      calls.forEach(s => {
        const line = el('div', 'tool-step', `→ <strong>${s.toolName}</strong>: ${JSON.stringify(s.toolArgs)}`);
        det.appendChild(line);
      });
      wrap.appendChild(det);
    }
  }

  const meta = el('div', 'msg-meta', new Date().toLocaleTimeString());
  wrap.appendChild(meta);

  $('chatMessages').appendChild(wrap);
  $('chatMessages').scrollTop = $('chatMessages').scrollHeight;

  // Update STM count
  const stmCount = $('stmCount');
  if (stmCount) {
    const cur = parseInt(stmCount.textContent) || 0;
    stmCount.textContent = (cur + 1) + ' 条';
  }
}

function appendSystemMessage(text) {
  const wrap = el('div', 'msg system');
  wrap.innerHTML = `<div class="msg-bubble">${escapeHtml(text)}</div>`;
  $('chatMessages').appendChild(wrap);
  $('chatMessages').scrollTop = $('chatMessages').scrollHeight;
}

let thinkingEl = null;
function showThinking() {
  thinkingEl = el('div', 'msg assistant msg-thinking');
  thinkingEl.innerHTML = `<div class="msg-bubble">思考中<span class="dots"><span>.</span><span>.</span><span>.</span></span></div>`;
  $('chatMessages').appendChild(thinkingEl);
  $('chatMessages').scrollTop = $('chatMessages').scrollHeight;
}
function hideThinking() {
  if (thinkingEl) { thinkingEl.remove(); thinkingEl = null; }
}

// ═══════════════════════════════════════════════════════════════ Skills view
function initSkills() {
  const grid = $('skillsGrid');
  if (!grid) return;
  grid.innerHTML = '';
  BUILTIN_SKILLS.forEach(skill => {
    const card = el('div', 'skill-card');
    card.innerHTML = `
      <div class="skill-header">
        <span class="skill-name">${skill.icon} ${skill.name}</span>
        <span class="badge ${RISK_COLORS[skill.risk]}">${RISK_LABELS[skill.risk]}</span>
      </div>
      <div class="skill-desc">${skill.desc}</div>
    `;
    grid.appendChild(card);
  });
}

// ═══════════════════════════════════════════════════════════════ Settings
function initSettings() {
  const s = state.settings;
  if ($('sandboxMode'))     $('sandboxMode').checked = s.sandboxMode !== false;
  if ($('confirmHighRisk')) $('confirmHighRisk').checked = s.confirmHighRisk !== false;
  if ($('maxIterations'))   $('maxIterations').value = s.maxIterations || 20;
  if ($('stmMax'))          $('stmMax').value = s.stmMax || 50;
  if ($('stmKeep'))         $('stmKeep').value = s.stmKeep || 10;
  if ($('sessionTtl'))      $('sessionTtl').value = s.sessionTtl || 60;
  if ($('llmProvider'))     $('llmProvider').value = s.llmProvider || 'OpenAI';
  if ($('defaultModel'))    $('defaultModel').value = s.defaultModel || 'gpt-4o';

  $('saveSettingsBtn')?.addEventListener('click', saveSettings);
}

function saveSettings() {
  state.settings = {
    sandboxMode:    $('sandboxMode')?.checked,
    confirmHighRisk:$('confirmHighRisk')?.checked,
    maxIterations:  parseInt($('maxIterations')?.value) || 20,
    stmMax:         parseInt($('stmMax')?.value) || 50,
    stmKeep:        parseInt($('stmKeep')?.value) || 10,
    sessionTtl:     parseInt($('sessionTtl')?.value) || 60,
    llmProvider:    $('llmProvider')?.value,
    defaultModel:   $('defaultModel')?.value,
  };
  localStorage.setItem('openclaw_settings', JSON.stringify(state.settings));
  appendSystemMessage('✅ 配置已保存');
  addLog('info', '系统配置已更新');
}

function loadSettings() {
  try {
    return JSON.parse(localStorage.getItem('openclaw_settings') || '{}');
  } catch { return {}; }
}

// ═══════════════════════════════════════════════════════════════ Audit log UI
function addLog(level, message) {
  const logViewer = $('auditLog');
  if (!logViewer) return;
  const line = el('div', `log-line log-${level}`);
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  logViewer.appendChild(line);
  logViewer.scrollTop = logViewer.scrollHeight;
}

$('refreshLogBtn')?.addEventListener('click', () => {
  addLog('info', '审计日志已刷新（完整日志请查看 ./logs/audit.jsonl）');
});

// ═══════════════════════════════════════════════════════════════ Connection status
function setConnectionStatus(status, label) {
  const dot = $('statusDot');
  const text = $('statusText');
  dot.className = 'status-dot ' + status;
  text.textContent = label || { connected: '已连接', connecting: '连接中…', disconnected: '未连接' }[status];
  state.connected = status === 'connected';
}

// ═══════════════════════════════════════════════════════════════ Confirm modal
export function showConfirm(title, body) {
  return new Promise(resolve => {
    $('confirmTitle').textContent = title;
    $('confirmBody').textContent = body;
    $('confirmModal').classList.remove('hidden');
    const ok = $('confirmOk');
    const cancel = $('confirmCancel');
    const cleanup = () => $('confirmModal').classList.add('hidden');
    ok.onclick = () => { cleanup(); resolve(true); };
    cancel.onclick = () => { cleanup(); resolve(false); };
  });
}

// ═══════════════════════════════════════════════════════════════ Utils
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
