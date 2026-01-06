"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const managerAuth_1 = require("./managerAuth");
const ipRotationPolicy_1 = require("../memory/ipRotationPolicy");
const immutableAuditLog_1 = require("../audit/immutableAuditLog");
const coldStorageSnapshot_1 = require("./coldStorageSnapshot");
const DB_FILE = path.join(process.cwd(), "data", "registered_ips.json");
const [, , action, ...args] = process.argv;
function loadDb() {
    if (!fs.existsSync(DB_FILE))
        return {};
    return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
}
function saveDb(db) {
    if (!fs.existsSync(path.dirname(DB_FILE)))
        fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}
async function main() {
    const secret = process.env.ARIES_MANAGER_SECRET;
    if (!secret)
        throw new Error("MANAGER_SECRET_REQUIRED");
    (0, managerAuth_1.assertManagerAccess)(secret);
    switch (action) {
        case "inspect": {
            const [userId] = args;
            const db = loadDb();
            console.log(db[userId] || []);
            break;
        }
        case "rotate": {
            const [userId, oldIp, newIp] = args;
            const res = ipRotationPolicy_1.IpRotationPolicy.rotateIp(userId, oldIp, newIp);
            console.log(res);
            break;
        }
        case "pardon": {
            const [userId, ip] = args;
            const db = loadDb();
            db[userId] = db[userId] || [];
            db[userId].push({ ip, lastSeen: Date.now() });
            saveDb(db);
            immutableAuditLog_1.ImmutableAuditLog.append("PARDON_GRANTED_BY_MANAGER", { userId, ip });
            console.log("✅ PARDON_GRANTED");
            break;
        }
        case "audit-verify": {
            console.log("AUDIT_CHAIN_VALID:", immutableAuditLog_1.ImmutableAuditLog.verifyChain());
            break;
        }
        case "snapshot": {
            const [label] = args;
            const res = coldStorageSnapshot_1.ColdStorageSnapshot.create(label || "MANUAL");
            console.log("SNAPSHOT_CREATED:", res);
            break;
        }
        case "snapshot-verify": {
            const [id] = args;
            console.log("SNAPSHOT_VALID:", coldStorageSnapshot_1.ColdStorageSnapshot.verify(id));
            break;
        }
        default:
            console.log(`Actions: inspect, rotate, pardon, audit-verify, snapshot, snapshot-verify`);
    }
}
main().catch(err => { console.error("MANAGER_CLI_ERROR:", err.message); });
