import * as crypto from "crypto";

interface OtpRecord {
  hash: string;
  expiresAt: number;
  userId: string;
  ip: string;
  role: string;
}

const LEDGER = new Map<string, OtpRecord>();
const TTL_MS = 2 * 60 * 1000; // 2 Menit

function hashOtp(codes: string[]): string {
  return crypto
    .createHash("sha256")
    .update(codes.join(":"))
    .digest("hex");
}

export class OtpLedger {
  static create(userId: string, ip: string, role: string, codes: string[]) {
    const key = `${userId}:${ip}`;
    LEDGER.set(key, {
      hash: hashOtp(codes),
      expiresAt: Date.now() + TTL_MS,
      userId,
      ip,
      role
    });
  }

  static verify(userId: string, ip: string, inputCodes: string[]): boolean {
    const key = `${userId}:${ip}`;
    const record = LEDGER.get(key);

    if (!record) return false;

    // Cek Kadaluarsa
    if (Date.now() > record.expiresAt) {
      LEDGER.delete(key);
      return false;
    }

    const inputHash = hashOtp(inputCodes);
    const ok = inputHash === record.hash;

    // ONE-TIME USE: Jika benar, langsung hapus agar tidak bisa di-replay
    if (ok) {
      LEDGER.delete(key);
    }

    return ok;
  }

  static purgeExpired() {
    const now = Date.now();
    for (const [k, v] of LEDGER.entries()) {
      if (v.expiresAt < now) LEDGER.delete(k);
    }
  }
}
