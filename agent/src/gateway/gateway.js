/**
 * OpenClaw Agent - Gateway Layer: Main Gateway
 * 本地优先的网关 - WebSocket服务器、消息路由、连接管理
 */

import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { SessionManager } from './session.js';
import { AgentRouter } from './router.js';
import { AuthManager } from '../security/auth.js';
import { AuditLogger } from '../security/audit.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const audit = new AuditLogger();

/**
 * Message types used in the WebSocket protocol.
 */
export const MSG = {
  // Client → Server
  AUTH: 'auth',
  CHAT: 'chat',
  END_SESSION: 'end_session',
  // Server → Client
  AUTH_RESULT: 'auth_result',
  CHAT_RESPONSE: 'chat_response',
  ERROR: 'error',
  PING: 'ping',
};

/**
 * OpenClaw Gateway - the central hub of the system.
 *
 * Responsibilities:
 *  - Serve the Web UI
 *  - Accept WebSocket connections from channel adapters and the web UI
 *  - Authenticate users and manage sessions
 *  - Route messages to the appropriate agent
 *  - Forward agent responses back to the originating client
 */
export class Gateway {
  /**
   * @param {object} config
   * @param {number}       [config.port=3000]
   * @param {AgentRouter}  config.router
   * @param {AuthManager}  [config.authManager]
   * @param {SessionManager} [config.sessionManager]
   */
  constructor(config) {
    this._port = config.port || 3000;
    this._router = config.router;
    this._auth = config.authManager || new AuthManager();
    this._sessions = config.sessionManager || new SessionManager();

    this._app = express();
    this._httpServer = createServer(this._app);
    this._wss = new WebSocketServer({ server: this._httpServer });

    this._setupHttp();
    this._setupWebSocket();
  }

  /**
   * Start listening.
   * @returns {Promise<void>}
   */
  start() {
    return new Promise(resolve => {
      this._httpServer.listen(this._port, () => {
        audit.log('GATEWAY', 'STARTED', { port: this._port });
        console.log(`✅ OpenClaw Gateway running at http://localhost:${this._port}`);
        resolve();
      });
    });
  }

  /**
   * Gracefully stop the gateway.
   * @returns {Promise<void>}
   */
  stop() {
    return new Promise((resolve, reject) => {
      this._wss.close(() => {
        this._httpServer.close(err => {
          if (err) return reject(err);
          audit.log('GATEWAY', 'STOPPED');
          resolve();
        });
      });
    });
  }

  // ── HTTP routes ───────────────────────────────────────────────────────────

  _setupHttp() {
    this._app.use(express.json());

    // Serve the web UI from the ../../../web directory
    const webDir = join(__dirname, '../../web');
    this._app.use(express.static(webDir));

    // Health check
    this._app.get('/health', (_req, res) => {
      res.json({
        status: 'ok',
        agents: this._router.listAgents(),
        sessions: this._sessions.count,
        uptime: process.uptime(),
      });
    });

    // REST: list agents
    this._app.get('/api/agents', (req, res) => {
      const token = this._extractToken(req);
      try {
        this._auth.validateSession(token);
        res.json({ agents: this._router.listAgents() });
      } catch (e) {
        res.status(401).json({ error: e.message });
      }
    });

    // REST: audit log tail (admin only)
    this._app.get('/api/audit', (req, res) => {
      const token = this._extractToken(req);
      try {
        if (!this._auth.hasRole(token, 'admin')) {
          return res.status(403).json({ error: 'Forbidden' });
        }
        res.json({ message: 'Audit log is written to ./logs/audit.jsonl' });
      } catch (e) {
        res.status(401).json({ error: e.message });
      }
    });

    // Fallback: serve index.html for SPA routing
    this._app.get('*', (_req, res) => {
      res.sendFile(join(__dirname, '../../web/index.html'));
    });
  }

  // ── WebSocket protocol ────────────────────────────────────────────────────

  _setupWebSocket() {
    this._wss.on('connection', (ws, req) => {
      const ip = req.socket.remoteAddress;
      audit.log('GATEWAY', 'WS_CONNECT', { ip });

      let sessionId = null;

      ws.on('message', async raw => {
        let msg;
        try {
          msg = JSON.parse(raw.toString());
        } catch {
          this._send(ws, MSG.ERROR, { message: 'Invalid JSON' });
          return;
        }

        try {
          await this._handleMessage(ws, msg, ip, sessionId, newSessionId => {
            sessionId = newSessionId;
          });
        } catch (err) {
          audit.log('GATEWAY', 'WS_ERROR', { error: err.message });
          this._send(ws, MSG.ERROR, { message: err.message });
        }
      });

      ws.on('close', () => {
        if (sessionId) {
          try { this._sessions.destroySession(sessionId); } catch { /* already gone */ }
        }
        audit.log('GATEWAY', 'WS_DISCONNECT', { ip, sessionId });
      });

      // Keepalive ping every 30s
      const pingInterval = setInterval(() => {
        if (ws.readyState === ws.OPEN) {
          this._send(ws, MSG.PING, {});
        } else {
          clearInterval(pingInterval);
        }
      }, 30_000);
    });
  }

  async _handleMessage(ws, msg, ip, sessionId, setSessionId) {
    switch (msg.type) {
      case MSG.AUTH: {
        const { userId, password, channel = 'web' } = msg.payload || {};
        const result = this._auth.authenticate(userId, password, channel);
        if (result.requiresMfa) {
          this._send(ws, MSG.AUTH_RESULT, { requiresMfa: true, mfaToken: result.mfaToken });
          return;
        }
        const session = this._sessions.createSession(userId, channel, result.token);
        setSessionId(session.sessionId);
        this._send(ws, MSG.AUTH_RESULT, { sessionId: session.sessionId, token: result.token });
        return;
      }

      case MSG.CHAT: {
        if (!sessionId) {
          this._send(ws, MSG.ERROR, { message: 'Not authenticated' });
          return;
        }
        const session = this._sessions.getSession(sessionId);
        const { message } = msg.payload || {};
        if (!message) {
          this._send(ws, MSG.ERROR, { message: 'Empty message' });
          return;
        }

        const agent = this._router.resolve(message);
        const context = {
          userId: session.userId,
          sessionId,
          authToken: session.authToken,
          channel: session.channel,
          ip,
        };

        const { response, steps } = await agent.chat(message, context);
        this._send(ws, MSG.CHAT_RESPONSE, { response, steps });
        return;
      }

      case MSG.END_SESSION: {
        if (sessionId) {
          this._sessions.destroySession(sessionId);
          setSessionId(null);
        }
        return;
      }

      default:
        this._send(ws, MSG.ERROR, { message: `Unknown message type: ${msg.type}` });
    }
  }

  _send(ws, type, payload) {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ type, payload }));
    }
  }

  _extractToken(req) {
    const auth = req.headers.authorization || '';
    return auth.startsWith('Bearer ') ? auth.slice(7) : '';
  }
}
