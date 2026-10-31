
import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";

function getEncryptionKey(): Buffer {
  const key = process.env.EXERCISE_TOKEN_ENCRYPTION_KEY;

  if (!key || !/^[0-9a-fA-F]{64}$/.test(key)) {
    throw new Error("EXERCISE_TOKEN_ENCRYPTION_KEY absente ou invalide");
  }

  return Buffer.from(key, "hex");
}

export function generateExerciseToken(): string {
  return randomBytes(32).toString("hex");
}

export function hashExerciseToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function encryptExerciseToken(token: string): string {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", getEncryptionKey(), iv);

  const encrypted = Buffer.concat([
    cipher.update(token, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  // IV + tag d'authentification + données chiffrées
  return Buffer.concat([iv, authTag, encrypted]).toString("base64");
}

export function decryptExerciseToken(encryptedToken: string): string {
  const data = Buffer.from(encryptedToken, "base64");

  if (data.length < 29) {
    throw new Error("Token chiffré invalide");
  }

  const iv = data.subarray(0, 12);
  const authTag = data.subarray(12, 28);
  const encrypted = data.subarray(28);

  const decipher = createDecipheriv("aes-256-gcm", getEncryptionKey(), iv);
  decipher.setAuthTag(authTag);

  return Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]).toString("utf8");
}
