/**
 * OpenClaw Agent - Security Layer: Input Sanitization & Output Filtering
 * 输入清洗与输出过滤，防止提示词注入攻击
 */

/**
 * Patterns that indicate a potential prompt-injection attempt.
 * Each entry is a { pattern: RegExp, description: string }.
 */
const INJECTION_PATTERNS = [
  {
    pattern: /ignore[\s\w]{0,30}instructions?/i,
    description: 'instruction override attempt',
  },
  {
    pattern: /you are (now |actually |really )?(a |an )?(different|new|evil|hacker|jailbreak)/i,
    description: 'persona override attempt',
  },
  {
    pattern: /disregard (all |previous |your )?instructions?/i,
    description: 'instruction disregard attempt',
  },
  {
    pattern: /system prompt|<\|system\|>|###\s*system/i,
    description: 'system prompt injection',
  },
  {
    pattern: /\[INST\]|\[\/INST\]|<s>|<\/s>/i,
    description: 'model-specific injection token',
  },
  {
    pattern: /(rm|del|format|drop table|shutdown|reboot)\s+(-rf?|\/[sqf]|database|\*)/i,
    description: 'destructive command injection',
  },
];

/**
 * Patterns that indicate potentially dangerous model output.
 */
const DANGEROUS_OUTPUT_PATTERNS = [
  { pattern: /exec\s*\(.*\)/i, description: 'code execution in output' },
  { pattern: /require\s*\(\s*['"]child_process['"]\s*\)/i, description: 'child_process in output' },
  { pattern: /os\.system\s*\(/i, description: 'os.system in output' },
  { pattern: /subprocess\.call\s*\(/i, description: 'subprocess in output' },
  { pattern: /eval\s*\(.*\)/i, description: 'eval in output' },
];

/**
 * Sanitizes user input before passing it to the LLM.
 */
export class InputSanitizer {
  /**
   * Scan input for injection patterns.
   * @param {string} input
   * @returns {{ safe: boolean, violations: string[] }}
   */
  static scan(input) {
    if (typeof input !== 'string') {
      return { safe: false, violations: ['input must be a string'] };
    }
    const violations = [];
    for (const { pattern, description } of INJECTION_PATTERNS) {
      if (pattern.test(input)) {
        violations.push(description);
      }
    }
    return { safe: violations.length === 0, violations };
  }

  /**
   * Strip or escape potentially dangerous HTML/script from user input.
   * @param {string} input
   * @returns {string}
   */
  static sanitizeHtml(input) {
    return String(input)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }

  /**
   * Remove null bytes and control characters (except common whitespace).
   * @param {string} input
   * @returns {string}
   */
  static stripControlChars(input) {
    // Keep \t \n \r, remove other control chars and null bytes
    return String(input).replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  }

  /**
   * Full sanitization pipeline: strip control chars then scan.
   * @param {string} input
   * @returns {{ cleaned: string, safe: boolean, violations: string[] }}
   */
  static process(input) {
    const cleaned = this.stripControlChars(input);
    const { safe, violations } = this.scan(cleaned);
    return { cleaned, safe, violations };
  }
}

/**
 * Validates and filters model output before returning to the user.
 */
export class OutputFilter {
  /**
   * Scan model output for dangerous patterns.
   * @param {string} output
   * @returns {{ safe: boolean, warnings: string[] }}
   */
  static scan(output) {
    const warnings = [];
    for (const { pattern, description } of DANGEROUS_OUTPUT_PATTERNS) {
      if (pattern.test(output)) {
        warnings.push(description);
      }
    }
    return { safe: warnings.length === 0, warnings };
  }

  /**
   * Redact sensitive-looking strings (API keys, tokens, passwords).
   * @param {string} output
   * @returns {string}
   */
  static redactSecrets(output) {
    return String(output)
      // API keys / tokens (e.g. sk-xxxxx, Bearer xxxxx)
      .replace(/\b(sk|pk|api|token|key|secret|password|passwd|pwd)\s*[=:]\s*\S+/gi, '$1=[REDACTED]')
      // Long hex strings (likely keys/hashes ≥ 32 chars)
      .replace(/\b[0-9a-f]{32,}\b/gi, '[REDACTED_HEX]');
  }

  /**
   * Full output pipeline: scan then redact.
   * @param {string} output
   * @returns {{ filtered: string, safe: boolean, warnings: string[] }}
   */
  static process(output) {
    const { safe, warnings } = this.scan(output);
    const filtered = this.redactSecrets(output);
    return { filtered, safe, warnings };
  }
}
