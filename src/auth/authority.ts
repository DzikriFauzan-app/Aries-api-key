import { createHmac } from "crypto";

const SECRET = "internal-hmac-secret-dont-leak"; 

// Sign konten payload (params) + keyId
export function signPayload(params: any, keyId: string): string {
  const content = JSON.stringify(params) + keyId;
  return createHmac("sha256", SECRET).update(content).digest("hex");
}

export function verifyPayload(params: any, keyId: string, signature: string): boolean {
  const expected = signPayload(params, keyId);
  return expected === signature;
}
