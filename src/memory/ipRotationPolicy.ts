import * as fs from "fs";
import * as path from "path";
import { ImmutableAuditLog } from "../audit/immutableAuditLog";

export class IpRotationPolicy {
    private static DB_FILE = path.join(process.cwd(), "data", "registered_ips.json");
    private static GRACE_MS = 24 * 60 * 60 * 1000;

    static rotateIp(userId: string, oldIp: string, newIp: string): { ok: boolean; message: string } {
        if (!fs.existsSync(this.DB_FILE)) return { ok: false, message: "NO_IP_DATABASE" };

        const db = JSON.parse(fs.readFileSync(this.DB_FILE, "utf-8"));
        let records: any[] = db[userId] || [];

        // Map to object if it's still a legacy string array
        records = records.map(r => typeof r === 'string' ? { ip: r, lastSeen: Date.now() } : r);

        const oldIndex = records.findIndex(r => r.ip === oldIp);
        if (oldIndex === -1) return { ok: false, message: "OLD_IP_NOT_REGISTERED" };
        if (records.some(r => r.ip === newIp)) return { ok: false, message: "NEW_IP_ALREADY_REGISTERED" };

        const now = Date.now();
        const lastSeen = records[oldIndex].lastSeen || 0;

        if (now - lastSeen > this.GRACE_MS) return { ok: false, message: "GRACE_WINDOW_EXPIRED" };

        // Perform Rotation
        records[oldIndex] = { ip: newIp, lastSeen: now };
        db[userId] = records;
        
        fs.writeFileSync(this.DB_FILE, JSON.stringify(db, null, 2));
        
        // Audit log must be strictly consistent for hashing
        ImmutableAuditLog.append("IP_ROTATED", { userId, from: oldIp, to: newIp });

        return { ok: true, message: "IP_ROTATION_SUCCESS" };
    }

    static touch(userId: string, ip: string) {
        if (!fs.existsSync(this.DB_FILE)) return;
        const db = JSON.parse(fs.readFileSync(this.DB_FILE, "utf-8"));
        let records: any[] = db[userId] || [];
        const idx = records.findIndex(r => (typeof r === 'string' ? r : r.ip) === ip);
        if (idx !== -1) {
            records[idx] = { ip: ip, lastSeen: Date.now() };
            db[userId] = records;
            fs.writeFileSync(this.DB_FILE, JSON.stringify(db, null, 2));
        }
    }
}
