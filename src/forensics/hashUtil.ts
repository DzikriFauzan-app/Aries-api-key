import crypto from "crypto";

export function hashPayload(payload: any): string {
  // Jika payload undefined/null, anggap object kosong atau string kosong
  const data = payload === undefined || payload === null 
    ? "" 
    : JSON.stringify(payload);
    
  return crypto
    .createHash("sha256")
    .update(data)
    .digest("hex");
}
