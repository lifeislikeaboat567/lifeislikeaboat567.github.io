/**
 * OpenClaw Agent - Skills Layer: Shell Command Execution
 * 命令行执行技能 - 在受控环境中运行 Shell 命令
 *
 * ⚠️  Security: This skill is HIGH risk and always requires authorization.
 *     Commands are subject to an allowlist when sandboxMode is enabled.
 */

import { execFile } from 'child_process';
import { promisify } from 'util';
import { BaseSkill, SkillError } from './base-skill.js';

const execFileAsync = promisify(execFile);

/**
 * Simple allowlist for safe shell programs.
 * When sandboxMode is on, only these base commands are permitted.
 */
const ALLOWED_COMMANDS = new Set([
  'ls', 'cat', 'echo', 'pwd', 'whoami', 'date', 'env',
  'node', 'python', 'python3', 'pip', 'pip3',
  'npm', 'npx', 'yarn', 'pnpm',
  'git', 'curl', 'wget',
  'grep', 'sed', 'awk', 'find', 'wc', 'sort', 'uniq',
  'mkdir', 'touch', 'cp', 'mv',
]);

/**
 * Dangerous shell metacharacters that could allow injection.
 */
const SHELL_INJECTION_PATTERN = /[;&|`$(){}[\]<>\\]/;

export class ShellSkill extends BaseSkill {
  static get skillName() { return 'shell_exec'; }
  static get description() {
    return 'Execute a shell command with explicit arguments. ' +
      'The command must be in the allowlist when sandbox mode is active.';
  }
  static get riskLevel() { return 'high'; }
  static get parameters() {
    return {
      command: {
        type: 'string',
        required: true,
        description: 'The executable to run (no shell metacharacters)',
      },
      args: {
        type: 'object', // array
        required: false,
        description: 'Array of string arguments',
      },
      cwd: {
        type: 'string',
        required: false,
        description: 'Working directory for the command',
      },
      timeout: {
        type: 'number',
        required: false,
        description: 'Timeout in milliseconds (default 10000)',
      },
    };
  }

  /**
   * @param {object} options
   * @param {boolean} [options.sandboxMode=true]
   */
  constructor(options = {}) {
    super();
    this._sandboxMode = options.sandboxMode !== false;
  }

  async _run({ command, args = [], cwd, timeout = 10_000 }, context) {
    // Never allow shell metacharacters in the command binary name
    if (SHELL_INJECTION_PATTERN.test(command)) {
      throw new SkillError(`Shell injection attempt in command: "${command}"`);
    }

    if (this._sandboxMode && !ALLOWED_COMMANDS.has(command.split('/').pop())) {
      throw new SkillError(
        `Command "${command}" is not in the allowed list. ` +
        'Disable sandbox mode or expand the allowlist to run this command.',
      );
    }

    // Sanitize each argument
    const safeArgs = args.map(a => {
      if (typeof a !== 'string') throw new SkillError('All arguments must be strings');
      return a;
    });

    const execOptions = {
      timeout,
      maxBuffer: 1024 * 1024, // 1 MB
      ...(cwd ? { cwd } : {}),
    };

    const { stdout, stderr } = await execFileAsync(command, safeArgs, execOptions);
    return {
      exitCode: 0,
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    };
  }
}
