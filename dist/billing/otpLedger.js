"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpLedger = void 0;
const LEDGER = new Map();
const MAX_ATTEMPTS = 3;
const TTL_MS = 120000; // 2 Menit
class OtpLedger {
    static put(key, entry) {
        LEDGER.set(key, entry);
    }
    static get(key) {
        const e = LEDGER.get(key);
        if (!e)
            return undefined;
        // Auto-check TTL saat diakses
        if (Date.now() > e.expiresAt) {
            LEDGER.delete(key);
            return undefined;
        }
        return e;
    }
    static fail(key) {
        const e = LEDGER.get(key);
        if (!e)
            return;
        e.attempts += 1;
        if (e.attempts >= MAX_ATTEMPTS) {
            console.log(`[SECURITY] Max attempts reached for ${key}. Purging.`);
            LEDGER.delete(key);
        }
    }
    static consume(key) {
        LEDGER.delete(key);
    }
    static purgeExpired() {
        const now = Date.now();
        let count = 0;
        for (const [k, v] of LEDGER.entries()) {
            if (now > v.expiresAt) {
                LEDGER.delete(k);
                count++;
            }
        }
        if (count > 0)
            console.log(`[CLEANUP] Purged ${count} expired OTP entries.`);
    }
    static size() {
        return LEDGER.size;
    }
}
exports.OtpLedger = OtpLedger;
