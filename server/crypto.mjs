import { pbkdf2Sync, randomBytes, randomUUID, timingSafeEqual } from "node:crypto"

export function hashPassword(password, salt = randomBytes(16).toString("hex")) {
  const hash = pbkdf2Sync(password, salt, 120000, 32, "sha256").toString("hex")
  return { salt, hash }
}

export function verifyPassword(password, salt, expectedHash) {
  const { hash } = hashPassword(password, salt)
  return timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(expectedHash, "hex"))
}

export function newSessionId() {
  return `${randomUUID()}.${randomBytes(24).toString("base64url")}`
}

export function encryptKey(rawKey) {
  return Buffer.from(rawKey, "utf8").toString("base64url")
}

export function decryptKey(cipherText) {
  return Buffer.from(cipherText, "base64url").toString("utf8")
}
