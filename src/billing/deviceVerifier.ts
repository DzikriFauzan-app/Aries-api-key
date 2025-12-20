import * as crypto from "crypto";
import { OtpLedger } from "./otpLedger";
import { getPlanLimit } from "./planContract";
import { BlacklistStore } from "./blacklistStore";

function hashCodes(codes: string[]) {
  return crypto.createHash("sha256").update(codes.join("-")).digest("hex");
}

export class DeviceVerifier {
  static initiateIpVerification(userId: string, plan: string, ip: string) {
    if (BlacklistStore.isBlacklisted(userId, ip)) return null;

    const limit = getPlanLimit(plan);
    const codes = Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000).toString());
    const key = `${userId}:${ip}`;

    OtpLedger.put(key, {
      userId,
      ip,
      codesHash: hashCodes(codes),
      expiresAt: Date.now() + 120_000,
      attempts: 0
    });

    console.log(`[AUTH] Verifikasi dipicu untuk ${userId} @ ${ip}. Role: ${limit.verifierRole}`);
    return codes;
  }

  static verify(userId: string, ip: string, inputCodes: string[]): boolean {
    const key = `${userId}:${ip}`;
    const entry = OtpLedger.get(key);

    if (!entry) return false;

    const ok = entry.codesHash === hashCodes(inputCodes);
    if (!ok) {
      OtpLedger.fail(key);
      return false;
    }

    OtpLedger.consume(key); // SUCCESS -> Anti-Replay
    return true;
  }
}
