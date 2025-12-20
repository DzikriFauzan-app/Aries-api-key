import * as fs from "fs";
import * as path from "path";
import { assertManagerAccess } from "./managerAuth";
import { IpRotationPolicy } from "../memory/ipRotationPolicy";
import { ImmutableAuditLog } from "../audit/immutableAuditLog";

const DB_FILE = path.join(process.cwd(), "data", "registered_ips.json");
const [, , action, ...args] = process.argv;

function loadDb(): any {
    if (!fs.existsSync(DB_FILE)) return {};
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}

function saveDb(db: any) {
    if (!fs.existsSync(path.dirname(DB_FILE))) fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

async function main() {
    const secret = process.env.ARIES_MANAGER_SECRET;
    if (!secret) throw new Error("MANAGER_SECRET_REQUIRED");
    assertManagerAccess(secret);

    switch (action) {
        case "inspect": {
            const [userId] = args;
            const db = loadDb();
            console.log(db[userId] || []);
            break;
        }
        case "pardon": {
            const [userId, ip] = args;
            const db = loadDb();
            db[userId] = db[userId] || [];
            // Simpan sebagai object agar sinkron dengan IpRotationPolicy
            db[userId].push({ ip, lastSeen: Date.now() });
            saveDb(db);
            ImmutableAuditLog.append("MANAGER_PARDON", { userId, ip });
            console.log("✅ PARDON_GRANTED");
            break;
        }
        case "audit-verify": {
            console.log("AUDIT_CHAIN_VALID:", ImmutableAuditLog.verifyChain());
            break;
        }
        default:
            console.log("Actions: inspect, pardon, audit-verify");
    }
}
main().catch(err => { console.error("MANAGER_CLI_ERROR:", err.message); });
