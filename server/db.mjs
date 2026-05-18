import { mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { DatabaseSync } from "node:sqlite"

const dbPath = resolve(process.cwd(), process.env.KAIRES_DB_PATH || "./data/kaires.sqlite")
mkdirSync(dirname(dbPath), { recursive: true })

export const db = new DatabaseSync(dbPath)
db.exec("PRAGMA journal_mode = WAL")
db.exec("PRAGMA foreign_keys = ON")

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS subscriptions (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  plan TEXT NOT NULL DEFAULT 'free',
  status TEXT NOT NULL DEFAULT 'active',
  monthly_limit INTEGER NOT NULL DEFAULT 100,
  used_this_month INTEGER NOT NULL DEFAULT 0,
  current_period_end TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS api_keys (
  user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  provider TEXT NOT NULL,
  token_id TEXT,
  key_cipher TEXT NOT NULL,
  masked_key TEXT NOT NULL,
  gateway_key_cipher TEXT,
  gateway_token_id TEXT,
  last_used_at TEXT,
  refreshed_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  role TEXT NOT NULL,
  content TEXT NOT NULL,
  model TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
`)

const apiKeyColumns = new Set(db.prepare("PRAGMA table_info(api_keys)").all().map(column => column.name))
if (!apiKeyColumns.has("gateway_key_cipher")) db.exec("ALTER TABLE api_keys ADD COLUMN gateway_key_cipher TEXT")
if (!apiKeyColumns.has("gateway_token_id")) db.exec("ALTER TABLE api_keys ADD COLUMN gateway_token_id TEXT")
if (!apiKeyColumns.has("last_used_at")) db.exec("ALTER TABLE api_keys ADD COLUMN last_used_at TEXT")

export function nowIso() {
  return new Date().toISOString()
}

export function nextMonthIso() {
  const date = new Date()
  date.setMonth(date.getMonth() + 1)
  return date.toISOString()
}

export function maskKey(key) {
  if (!key) return ""
  if (key.length <= 8) return `${key.slice(0, 2)}****${key.slice(-2)}`
  return `${key.slice(0, 6)}********${key.slice(-4)}`
}

export function publicUser(user) {
  if (!user) return null
  return { id: user.id, email: user.email, name: user.name }
}
