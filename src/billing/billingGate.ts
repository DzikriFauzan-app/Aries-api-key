import * as fs from "fs";
import * as path from "path";
import { enforceDowngrade } from "./downgradeEngine";

export class BillingGate {
    private static BILLING_DB = path.join(process.cwd(), "data/billing.json");

    static check(userId: string): { ok: boolean; reason?: string } {
        // Jalankan pemeriksaan penurunan paket otomatis
        enforceDowngrade(userId);

        if (!fs.existsSync(this.BILLING_DB)) return { ok: true };

        const db = JSON.parse(fs.readFileSync(this.BILLING_DB, "utf-8"));
        const rec = db[userId];

        if (!rec) return { ok: true };

        // Selama status ACTIVE atau dalam masa Grace (PAST_DUE tapi belum expired grace), izinkan lewat.
        // DowngradeEngine sudah mengurus penurunan plan di licenses.json jika grace habis.
        if (rec.status !== "ACTIVE" && rec.status !== "PAST_DUE") {
            return { ok: false, reason: `BILLING_${rec.status}` };
        }

        return { ok: true };
    }
}
