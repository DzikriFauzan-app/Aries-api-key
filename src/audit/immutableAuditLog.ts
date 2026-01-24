import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";

interface AuditEntry {
    timestamp: number;
    event: string;
    data: any;
    prevHash: string;
    hash: string;
}

export class ImmutableAuditLog {
    private static LOG_FILE = path.join(process.cwd(), "audit_worm.log");

    static append(event: string, data: any) {
        const prevHash = this.getLastHash();
        const payload = {
            timestamp: Date.now(),
            event,
            data,
            prevHash
        };

        const hash = crypto
            .createHash("sha256")
            .update(JSON.stringify(payload))
            .digest("hex");

        const entry: AuditEntry = { ...payload, hash };

        fs.appendFileSync(
            this.LOG_FILE,
            JSON.stringify(entry) + "\n",
            { encoding: "utf-8" }
        );
    }

    private static getLastHash(): string {
        if (!fs.existsSync(this.LOG_FILE)) return "GENESIS";
        const content = fs.readFileSync(this.LOG_FILE, "utf-8").trim();
        if (!content) return "GENESIS";
        
        const lines = content.split("\n");
        try {
            const last = JSON.parse(lines[lines.length - 1]);
            return last.hash || "GENESIS";
        } catch (e) {
            return "GENESIS";
        }
    }

    static verifyChain(): boolean {
        if (!fs.existsSync(this.LOG_FILE)) return true;
        const content = fs.readFileSync(this.LOG_FILE, "utf-8").trim();
        if (!content) return true;

        const lines = content.split("\n");
        let prevHash = "GENESIS";

        for (const line of lines) {
            try {
                const entry: AuditEntry = JSON.parse(line);
                const recalculated = crypto
                    .createHash("sha256")
                    .update(
                        JSON.stringify({
                            timestamp: entry.timestamp,
                            event: entry.event,
                            data: entry.data,
                            prevHash
                        })
                    )
                    .digest("hex");

                if (recalculated !== entry.hash) return false;
                prevHash = entry.hash;
            } catch (e) {
                return false;
            }
        }
        return true;
    }
}
