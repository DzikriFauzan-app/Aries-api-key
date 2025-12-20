import * as fs from "fs";
import * as path from "path";

type BillingStatus = "ACTIVE" | "PAST_DUE" | "SUSPENDED" | "EXPIRED";

export class BillingGate {
    private static BILLING_DB = path.join(process.cwd(), "data/billing.json");

    static check(userId: string): { ok: boolean; reason?: string } {
        if (!fs.existsSync(this.BILLING_DB)) {
            // Default ke true untuk masa transisi/development, atau false untuk strict
            return { ok: true }; 
        }

        const db = JSON.parse(fs.readFileSync(this.BILLING_DB, "utf-8"));
        const rec = db[userId];

        // Jika tidak ada di DB, dianggap FREE USER (Allowed by default)
        if (!rec) return { ok: true };

        // Cek Status Billing
        if (rec.status !== "ACTIVE") {
            return { ok: false, reason: `BILLING_${rec.status}` };
        }

        // Cek Masa Berlaku (Expiration)
        if (Date.now() > rec.expireAt) {
            return { ok: false, reason: "BILLING_EXPIRED" };
        }

        return { ok: true };
    }
}
