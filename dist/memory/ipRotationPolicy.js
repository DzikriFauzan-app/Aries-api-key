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
exports.IpRotationPolicy = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const immutableAuditLog_1 = require("../audit/immutableAuditLog");
class IpRotationPolicy {
    static rotateIp(userId, oldIp, newIp) {
        if (!fs.existsSync(this.DB_FILE))
            return { ok: false, message: "NO_IP_DATABASE" };
        const db = JSON.parse(fs.readFileSync(this.DB_FILE, "utf-8"));
        let records = db[userId] || [];
        // Map to object if it's still a legacy string array
        records = records.map(r => typeof r === 'string' ? { ip: r, lastSeen: Date.now() } : r);
        const oldIndex = records.findIndex(r => r.ip === oldIp);
        if (oldIndex === -1)
            return { ok: false, message: "OLD_IP_NOT_REGISTERED" };
        if (records.some(r => r.ip === newIp))
            return { ok: false, message: "NEW_IP_ALREADY_REGISTERED" };
        const now = Date.now();
        const lastSeen = records[oldIndex].lastSeen || 0;
        if (now - lastSeen > this.GRACE_MS)
            return { ok: false, message: "GRACE_WINDOW_EXPIRED" };
        // Perform Rotation
        records[oldIndex] = { ip: newIp, lastSeen: now };
        db[userId] = records;
        fs.writeFileSync(this.DB_FILE, JSON.stringify(db, null, 2));
        // Audit log must be strictly consistent for hashing
        immutableAuditLog_1.ImmutableAuditLog.append("IP_ROTATED", { userId, from: oldIp, to: newIp });
        return { ok: true, message: "IP_ROTATION_SUCCESS" };
    }
    static touch(userId, ip) {
        if (!fs.existsSync(this.DB_FILE))
            return;
        const db = JSON.parse(fs.readFileSync(this.DB_FILE, "utf-8"));
        let records = db[userId] || [];
        const idx = records.findIndex(r => (typeof r === 'string' ? r : r.ip) === ip);
        if (idx !== -1) {
            records[idx] = { ip: ip, lastSeen: Date.now() };
            db[userId] = records;
            fs.writeFileSync(this.DB_FILE, JSON.stringify(db, null, 2));
        }
    }
}
exports.IpRotationPolicy = IpRotationPolicy;
IpRotationPolicy.DB_FILE = path.join(process.cwd(), "data", "registered_ips.json");
IpRotationPolicy.GRACE_MS = 24 * 60 * 60 * 1000;
