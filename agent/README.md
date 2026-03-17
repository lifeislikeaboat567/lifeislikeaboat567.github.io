# 🦀 OpenClaw Agent

一个参考 OpenClaw 架构设计的 AI Agent 系统，采用四层架构实现完整的自主任务规划与执行能力。

---

## 架构总览

```
┌─────────────────────────────────────────────────────────────────────┐
│                         渠道接入层                                    │
│  Web UI · Telegram · Discord · Slack · WhatsApp · 飞书/企业微信      │
└─────────────────────────────────┬───────────────────────────────────┘
                                  │ WebSocket / HTTP
┌─────────────────────────────────▼───────────────────────────────────┐
│                         网关控制层 (Gateway)                          │
│  WebSocket 服务器 · 消息路由 · 会话管理 · 权限校验                    │
│  AgentRouter: 关键词路由 → 通用/编程/写作 Agent                      │
└──────────┬──────────────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────────────┐
│                         智能体层 (Agent)                              │
│  ReAct 循环 (思考-行动-观察) · 多 Agent 并行                         │
│  ContextEngine: 短期 + 长期记忆 · 自动压缩摘要 (lossless-claw)       │
└──────────┬──────────────────────────────────────────────────────────┘
           │
┌──────────▼──────────────────────────────────────────────────────────┐
│                       执行与记忆层                                    │
│  技能库 (Skills): 文件操作 · Shell · HTTP API · 天气                 │
│  记忆系统: ShortTermMemory (会话) + LongTermMemory (持久化)           │
└─────────────────────────────────────────────────────────────────────┘
                                  │
┌─────────────────────────────────▼───────────────────────────────────┐
│                       安全机制 (贯穿全局)                             │
│  AuthManager · InputSanitizer · OutputFilter · AuditLogger          │
│  沙箱命令执行 · 高危操作授权 · 会话隔离 · 审计日志                   │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 目录结构

```
agent/
├── src/
│   ├── index.js              # 系统入口 - 组装所有层级
│   ├── gateway/
│   │   ├── gateway.js        # WebSocket + HTTP 服务器
│   │   ├── router.js         # 多 Agent 路由
│   │   └── session.js        # 会话管理与隔离
│   ├── agents/
│   │   ├── base-agent.js     # ReAct 循环 · BaseAgent / CodingAgent / WritingAgent
│   │   └── context-engine.js # 可插拔上下文引擎 (lossless-claw)
│   ├── skills/
│   │   ├── base-skill.js     # 技能基类与标准接口
│   │   ├── filesystem.js     # 文件操作技能
│   │   ├── shell.js          # Shell 命令执行 (沙箱)
│   │   └── api.js            # HTTP API + 天气 + 技能注册表
│   ├── memory/
│   │   ├── short-term.js     # 短期记忆 (会话上下文 + 自动摘要)
│   │   └── long-term.js      # 长期记忆 (偏好 + 知识 + 任务历史)
│   └── security/
│       ├── auth.js           # 用户认证 + MFA + 会话 Token
│       ├── sanitizer.js      # 输入清洗 + 输出过滤
│       └── audit.js          # 审计日志
├── web/
│   ├── index.html            # Web 控制台界面
│   ├── style.css             # UI 样式
│   └── app.js                # 前端逻辑 (WebSocket 客户端)
├── tests/
│   └── agent.test.js         # 单元测试 (Node.js 内置 test runner)
├── .env.example              # 环境变量配置模板
└── package.json
```

---

## 快速开始

### 1. 安装依赖

```bash
cd agent
npm install
```

### 2. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env，填入你的 LLM API Key
```

### 3. 启动系统

```bash
npm start
# 或开发模式 (文件变更自动重启)
npm run dev
```

### 4. 打开 Web 控制台

浏览器访问：`http://localhost:3000`

默认账号：`admin / changeme`（请在 .env 中修改）

---

## 运行测试

```bash
cd agent
node --test tests/agent.test.js
```

---

## 核心功能

### 📡 渠道接入层

| 渠道 | 状态 | 说明 |
|------|------|------|
| Web UI | ✅ 完整实现 | `web/` 目录，WebSocket 直连 |
| Telegram | 🔧 适配器存根 | 需配置 Bot Token |
| Discord | 🔧 适配器存根 | 需对接 discord.js |
| Slack | 🔧 适配器存根 | 需对接 @slack/bolt |
| WhatsApp | 📋 规划中 | Twilio API |

### 🧠 智能体层

- **ReAct 循环**：思考 → 调用工具 → 观察结果 → 继续思考
- **多 Agent 路由**：根据关键词自动路由到编程/写作/通用 Agent
- **上下文引擎**：自动压缩超长对话，"永远不忘"

### 🛠️ 技能库

| 技能 | 风险等级 | 说明 |
|------|---------|------|
| `read_file` | 低 | 读取文件内容 |
| `write_file` | 中 | 写入/创建文件 |
| `move_file` | 中 | 移动/重命名文件 |
| `copy_file` | 中 | 复制文件 |
| `delete_file` | **高** | 删除文件（需授权）|
| `list_directory` | 低 | 列出目录 |
| `shell_exec` | **高** | 执行 Shell 命令（沙箱 + 需授权）|
| `http_api` | 中 | HTTP API 请求 |
| `get_weather` | 低 | 查询天气 |

### 🔒 安全机制

- **身份认证**：密码哈希、会话 Token、MFA 支持
- **会话隔离**：每个用户的上下文严格隔离
- **输入清洗**：检测并拦截提示词注入攻击
- **输出过滤**：过滤危险代码和敏感信息
- **沙箱执行**：Shell 命令仅允许白名单命令
- **高危授权**：高风险技能需要显式授权
- **审计日志**：所有操作记录到 `./logs/audit.jsonl`

### 自定义技能

继承 `BaseSkill` 并实现 `_run()` 方法：

```javascript
import { BaseSkill } from './src/skills/base-skill.js';

export class MySkill extends BaseSkill {
  static get skillName() { return 'my_skill'; }
  static get description() { return '执行自定义操作'; }
  static get riskLevel() { return 'low'; }  // 'low' | 'medium' | 'high'
  static get parameters() {
    return {
      input: { type: 'string', required: true, description: '输入内容' },
    };
  }

  async _run({ input }, context) {
    // 你的逻辑
    return { result: `处理完成: ${input}` };
  }
}
```

然后注册到 `SkillRegistry`：
```javascript
skills.register(MySkill);
```

---

## Web 控制台预览

Web 控制台包含以下模块：

- **💬 对话**：与 Agent 实时交互，支持工具调用可视化
- **🤖 Agent 管理**：查看已注册的 Agent 和路由规则
- **🛠️ 技能库**：浏览内置技能，支持自定义安装
- **🧠 记忆系统**：查看短期会话上下文和长期记忆
- **📡 渠道接入**：配置各渠道适配器
- **🔒 安全日志**：查看审计事件和安全统计
- **⚙️ 系统配置**：LLM、安全、记忆参数配置

---

## 增量迭代建议

推荐按以下顺序逐步完善系统：

1. ✅ **最小闭环**：本地 Gateway + 基础技能（命令行）→ 理解指令并执行
2. 🔄 **丰富技能**：接入更多 API，编写领域专属技能
3. 🔄 **多渠道接入**：配置 Telegram/Discord Bot
4. 🔄 **记忆优化**：接入向量数据库提升长期记忆检索质量
5. 🔄 **安全加固**：容器化沙箱，细粒度权限控制
