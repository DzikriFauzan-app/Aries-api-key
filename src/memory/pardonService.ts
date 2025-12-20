import * as crypto from "crypto";
import * as fs from "fs";
import * as path from "path";
import { ImmutableAuditLog } from "../audit/immutableAuditLog";

export interface PardonTokenPayload {
    userId: string;
    ip: string;
    issuedAt: number;
    expiresAt: number;
}

export class PardonService {
    private static PARDON_DB = path.join(process.cwd(), "pardon_tokens.json");
    private static MANAGER_SECRET = process.env.MANAGER_PARDON_KEY || "MASTER_KEY_ARIES_PARDON_2025";

    static generate(userId: string, ip: string, ttlMinutes = 10): string {
        const payload: PardonTokenPayload = {
            userId,
            ip,
            issuedAt: Date.now(),
            expiresAt: Date.now() + ttlMinutes * 60_000
        };
        const raw = JSON.stringify(payload);
        const signature = crypto
            .createHmac("sha256", this.MANAGER_SECRET)
            .update(raw)
            .digest("hex");

        const token = Buffer.from(
            JSON.stringify({ payload, signature })
        ).toString("base64");

        this.storeToken(token);
        
        // Audit Log: Pardon Issued
        ImmutableAuditLog.append("PARDON_ISSUED", { userId, ip, expiresAt: payload.expiresAt });
        
        return token;
    }

    static validate(token: string): PardonTokenPayload | null {
        if (!fs.existsSync(this.PARDON_DB)) return null;
        
        const db: string[] = JSON.parse(fs.readFileSync(this.PARDON_DB, "utf-8"));
        if (!db.includes(token)) return null;

        try {
            const decoded = JSON.parse(Buffer.from(token, "base64").toString());
            const { payload, signature } = decoded;

            const expectedSig = crypto
                .createHmac("sha256", this.MANAGER_SECRET)
                .update(JSON.stringify(payload))
                .digest("hex");

            if (signature !== expectedSig) return null;
            if (Date.now() > payload.expiresAt) return null;

            this.consume(token);
            return payload;
        } catch (e) {
            return null;
        }
    }

    private static storeToken(token: string) {
        const db = fs.existsSync(this.PARDON_DB) ? JSON.parse(fs.readFileSync(this.PARDON_DB, "utf-8")) : [];
        db.push(token);
        fs.writeFileSync(this.PARDON_DB, JSON.stringify(db, null, 2));
    }

    private static consume(token: string) {
        const db: string[] = JSON.parse(fs.readFileSync(this.PARDON_DB, "utf-8"));
        fs.writeFileSync(
            this.PARDON_DB,
            JSON.stringify(db.filter(t => t !== token), null, 2)
        );
    }
}
