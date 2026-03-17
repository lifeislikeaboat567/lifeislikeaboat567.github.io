/**
 * OpenClaw Agent - Skills Layer: File System Operations
 * 文件系统操作技能 - 读/写/移动/重命名文件、整理目录
 */

import { readFileSync, writeFileSync, renameSync, unlinkSync, readdirSync, statSync, mkdirSync, copyFileSync } from 'fs';
import { join, dirname, basename } from 'path';
import { BaseSkill, SkillError } from './base-skill.js';

/** Resolve and validate a path is within a permitted root. */
function safePath(rawPath, root) {
  const resolved = join(root, rawPath);
  if (!resolved.startsWith(root)) {
    throw new SkillError(`Path traversal detected: "${rawPath}"`);
  }
  return resolved;
}

// ── ReadFile ──────────────────────────────────────────────────────────────────

export class ReadFileSkill extends BaseSkill {
  static get skillName() { return 'read_file'; }
  static get description() { return 'Read the contents of a file within the workspace.'; }
  static get riskLevel() { return 'low'; }
  static get parameters() {
    return {
      path: { type: 'string', required: true, description: 'Relative path to the file' },
    };
  }

  async _run({ path }, context) {
    const root = context.workspace || process.cwd();
    const filePath = safePath(path, root);
    const content = readFileSync(filePath, 'utf8');
    return { path, content };
  }
}

// ── WriteFile ─────────────────────────────────────────────────────────────────

export class WriteFileSkill extends BaseSkill {
  static get skillName() { return 'write_file'; }
  static get description() { return 'Write content to a file in the workspace (creates if missing).'; }
  static get riskLevel() { return 'medium'; }
  static get parameters() {
    return {
      path: { type: 'string', required: true, description: 'Relative path to the file' },
      content: { type: 'string', required: true, description: 'Text content to write' },
    };
  }

  async _run({ path, content }, context) {
    const root = context.workspace || process.cwd();
    const filePath = safePath(path, root);
    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content, 'utf8');
    return { path, bytesWritten: Buffer.byteLength(content, 'utf8') };
  }
}

// ── MoveFile ──────────────────────────────────────────────────────────────────

export class MoveFileSkill extends BaseSkill {
  static get skillName() { return 'move_file'; }
  static get description() { return 'Move or rename a file within the workspace.'; }
  static get riskLevel() { return 'medium'; }
  static get parameters() {
    return {
      src: { type: 'string', required: true, description: 'Source path' },
      dest: { type: 'string', required: true, description: 'Destination path' },
    };
  }

  async _run({ src, dest }, context) {
    const root = context.workspace || process.cwd();
    renameSync(safePath(src, root), safePath(dest, root));
    return { src, dest };
  }
}

// ── DeleteFile ────────────────────────────────────────────────────────────────

export class DeleteFileSkill extends BaseSkill {
  static get skillName() { return 'delete_file'; }
  static get description() { return 'Delete a file from the workspace.'; }
  static get riskLevel() { return 'high'; }
  static get parameters() {
    return {
      path: { type: 'string', required: true, description: 'Relative path of the file to delete' },
    };
  }

  async _run({ path }, context) {
    const root = context.workspace || process.cwd();
    unlinkSync(safePath(path, root));
    return { deleted: path };
  }
}

// ── ListDirectory ─────────────────────────────────────────────────────────────

export class ListDirectorySkill extends BaseSkill {
  static get skillName() { return 'list_directory'; }
  static get description() { return 'List files and directories in a workspace folder.'; }
  static get riskLevel() { return 'low'; }
  static get parameters() {
    return {
      path: { type: 'string', required: false, description: 'Relative directory path (defaults to workspace root)' },
    };
  }

  async _run({ path = '.' }, context) {
    const root = context.workspace || process.cwd();
    const dirPath = safePath(path, root);
    const entries = readdirSync(dirPath).map(name => {
      const full = join(dirPath, name);
      const st = statSync(full);
      return { name, type: st.isDirectory() ? 'directory' : 'file', size: st.size };
    });
    return { path, entries };
  }
}

// ── CopyFile ──────────────────────────────────────────────────────────────────

export class CopyFileSkill extends BaseSkill {
  static get skillName() { return 'copy_file'; }
  static get description() { return 'Copy a file within the workspace.'; }
  static get riskLevel() { return 'medium'; }
  static get parameters() {
    return {
      src: { type: 'string', required: true, description: 'Source path' },
      dest: { type: 'string', required: true, description: 'Destination path' },
    };
  }

  async _run({ src, dest }, context) {
    const root = context.workspace || process.cwd();
    const destPath = safePath(dest, root);
    mkdirSync(dirname(destPath), { recursive: true });
    copyFileSync(safePath(src, root), destPath);
    return { src, dest };
  }
}
