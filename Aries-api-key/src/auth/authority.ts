import { findKey } from "./keyStore";

export function verifyAuthority(apiKey?: string) {
  if (!apiKey) {
    return { allowed: false };
  }

  const record = findKey(apiKey);
  if (!record) {
    return { allowed: false };
  }

  return {
    allowed: true,
    scopes: record.scopes,
    keyId: record.key
  };
}
