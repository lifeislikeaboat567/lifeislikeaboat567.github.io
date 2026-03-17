/**
 * OpenClaw Agent - Skills Layer: Third-party API Integration
 * API集成技能 - 调用第三方服务
 */

import { BaseSkill, SkillError } from './base-skill.js';

// Use native fetch (Node ≥ 18) or fall back to node-fetch
const fetchFn = typeof fetch !== 'undefined'
  ? fetch
  : (await import('node-fetch').then(m => m.default).catch(() => null));

/**
 * Generic HTTP API call skill.
 */
export class HttpApiSkill extends BaseSkill {
  static get skillName() { return 'http_api'; }
  static get description() {
    return 'Make an HTTP request to an external API endpoint.';
  }
  static get riskLevel() { return 'medium'; }
  static get parameters() {
    return {
      url: { type: 'string', required: true, description: 'Full URL of the API endpoint' },
      method: { type: 'string', required: false, description: 'HTTP method (default: GET)' },
      headers: { type: 'object', required: false, description: 'Request headers' },
      body: { type: 'object', required: false, description: 'JSON request body' },
      timeout: { type: 'number', required: false, description: 'Timeout in ms (default 10000)' },
    };
  }

  async _run({ url, method = 'GET', headers = {}, body, timeout = 10_000 }) {
    if (!fetchFn) throw new SkillError('fetch is not available in this environment');

    // Validate URL protocol
    let parsedUrl;
    try {
      parsedUrl = new URL(url);
    } catch {
      throw new SkillError(`Invalid URL: ${url}`);
    }
    if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
      throw new SkillError(`Unsupported protocol: ${parsedUrl.protocol}`);
    }

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeout);

    try {
      const res = await fetchFn(url, {
        method: method.toUpperCase(),
        headers: { 'Content-Type': 'application/json', ...headers },
        body: body ? JSON.stringify(body) : undefined,
        signal: controller.signal,
      });
      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }
      return { status: res.status, ok: res.ok, data };
    } finally {
      clearTimeout(timer);
    }
  }
}

/**
 * Weather query skill (example of a concrete API integration).
 * Uses the open-meteo.com free API - no API key required.
 */
export class WeatherSkill extends BaseSkill {
  static get skillName() { return 'get_weather'; }
  static get description() { return 'Get current weather for a latitude/longitude location.'; }
  static get riskLevel() { return 'low'; }
  static get parameters() {
    return {
      latitude: { type: 'number', required: true, description: 'Latitude' },
      longitude: { type: 'number', required: true, description: 'Longitude' },
    };
  }

  async _run({ latitude, longitude }) {
    const http = new HttpApiSkill();
    const url =
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
      `&current=temperature_2m,wind_speed_10m&temperature_unit=celsius`;
    const { data } = await http._run({ url });
    return {
      latitude,
      longitude,
      temperature_celsius: data?.current?.temperature_2m,
      wind_speed_kmh: data?.current?.wind_speed_10m,
    };
  }
}

/**
 * Skill Registry - central registry for discovering and invoking skills.
 */
export class SkillRegistry {
  constructor() {
    this._skills = new Map();
  }

  /**
   * Register a skill class.
   * @param {typeof BaseSkill} SkillClass
   */
  register(SkillClass) {
    const instance = new SkillClass();
    this._skills.set(SkillClass.skillName, instance);
    return this;
  }

  /**
   * Register multiple skill classes at once.
   * @param {Array<typeof BaseSkill>} skillClasses
   */
  registerAll(skillClasses) {
    for (const cls of skillClasses) this.register(cls);
    return this;
  }

  /**
   * Get a skill instance by name.
   * @param {string} name
   * @returns {BaseSkill}
   */
  get(name) {
    const skill = this._skills.get(name);
    if (!skill) throw new SkillError(`Unknown skill: "${name}"`);
    return skill;
  }

  /**
   * Return all registered skill tool definitions (for LLM function calling).
   * @returns {Array}
   */
  getToolDefinitions() {
    return [...this._skills.values()].map(s => s.toToolDefinition());
  }

  /**
   * Execute a skill by name.
   * @param {string} name
   * @param {object} params
   * @param {object} context
   */
  async execute(name, params, context) {
    return this.get(name).execute(params, context);
  }

  /**
   * List all registered skill names.
   * @returns {string[]}
   */
  list() {
    return [...this._skills.keys()];
  }
}
