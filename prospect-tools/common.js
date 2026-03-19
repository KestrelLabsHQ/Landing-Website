const fs = require('fs/promises');
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env'), quiet: true });

function parseArgs(argv) {
  const args = {};
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (!token.startsWith('--')) continue;
    const key = token.slice(2);
    const next = argv[i + 1];
    if (!next || next.startsWith('--')) {
      args[key] = true;
      continue;
    }
    if (args[key] === undefined) {
      args[key] = next;
    } else if (Array.isArray(args[key])) {
      args[key].push(next);
    } else {
      args[key] = [args[key], next];
    }
    i += 1;
  }
  return args;
}

function toArray(value) {
  if (value === undefined || value === null) return [];
  return Array.isArray(value) ? value : [value];
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/^www\./, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizeUrl(input) {
  if (!input) return null;
  try {
    return new URL(input).toString();
  } catch {
    try {
      return new URL(`https://${input}`).toString();
    } catch {
      return null;
    }
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function writeJson(filePath, data) {
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function uniqBy(items, keyFn) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = keyFn(item);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

function parseNumberish(value) {
  if (value === undefined || value === null) return null;
  const clean = String(value).replace(/[^0-9.]+/g, '');
  if (!clean) return null;
  const parsed = Number(clean);
  return Number.isFinite(parsed) ? parsed : null;
}

function extractEmails(text) {
  if (!text) return [];
  const matches = String(text).match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi) || [];
  return [...new Set(matches.map((email) => email.toLowerCase()))];
}

function csvEscape(value) {
  if (value === undefined || value === null) return '';
  const stringValue = String(value);
  if (!/[",\n]/.test(stringValue)) return stringValue;
  return `"${stringValue.replace(/"/g, '""')}"`;
}

async function writeCsv(filePath, rows) {
  if (!rows.length) {
    await fs.writeFile(filePath, '', 'utf8');
    return;
  }
  const headers = [...new Set(rows.flatMap((row) => Object.keys(row)))];
  const lines = [headers.join(',')];
  for (const row of rows) {
    lines.push(headers.map((header) => csvEscape(row[header])).join(','));
  }
  await ensureDir(path.dirname(filePath));
  await fs.writeFile(filePath, lines.join('\n') + '\n', 'utf8');
}

module.exports = {
  clamp,
  ensureDir,
  extractEmails,
  normalizeUrl,
  parseArgs,
  parseNumberish,
  readJson,
  sleep,
  slugify,
  toArray,
  uniqBy,
  writeCsv,
  writeJson,
};
