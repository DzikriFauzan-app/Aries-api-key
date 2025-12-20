import * as fs from "fs";
import { DeviceVerifier } from "./deviceVerifier";
import { getPlanLimit } from "./planContract";

const DB_FILE = "data/registered_ips.json";

function loadDb(): any {
  if (!fs.existsSync(DB_FILE)) return {};
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
  } catch (e) {
    return {};
  }
}

function saveDb(db: any) {
  if (!fs.existsSync("data")) fs.mkdirSync("data");
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export class IpActivator {
  static commitIp(
    userId: string, 
    plan: string, 
    ip: string, 
    otpCodes: string[]
  ): { ok: boolean; reason?: string } {
    // 1. Validasi OTP (Step 19.6)
    const verified = DeviceVerifier.verify(userId, ip, otpCodes);
    if (!verified) {
      return { ok: false, reason: "OTP_VERIFICATION_FAILED_OR_EXPIRED" };
    }

    const db = loadDb();
    const limit = getPlanLimit(plan);
    db[userId] = db[userId] || [];

    // 2. Cek apakah IP sudah ada (Avoid Duplicate)
    const alreadyExists = db[userId].some((entry: any) => entry.ip === ip);
    if (alreadyExists) return { ok: true };

    // 3. HARD SLOT CHECK (Step 15.5 - 18.3)
    if (db[userId].length >= limit.maxIpSlots) {
      return { ok: false, reason: "IP_SLOT_LIMIT_REACHED" };
    }

    // 4. FINAL COMMIT
    db[userId].push({
      ip,
      activatedAt: Date.now(),
      plan
    });

    saveDb(db);
    return { ok: true };
  }
}
