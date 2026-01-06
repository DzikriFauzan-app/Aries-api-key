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
exports.LicenseGuardian = void 0;
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const pardonService_1 = require("./pardonService");
const immutableAuditLog_1 = require("../audit/immutableAuditLog");
const ipRotationPolicy_1 = require("./ipRotationPolicy");
class LicenseGuardian {
    static getTierDetails(plan) {
        const p = plan.toUpperCase();
        if (p === 'FREE' || p === 'PRO')
            return { slots: 1 };
        if (p === 'PLATINUM')
            return { slots: 500 };
        const level = parseInt(p.replace('ENTERPRISE_', '')) || 1;
        return { slots: 50 + (level - 1) * 25 };
    }
    static async validateCorporateAccess(plan, userId, currentIp) {
        if (!fs.existsSync(path.dirname(this.REG_IPS_FILE))) {
            fs.mkdirSync(path.dirname(this.REG_IPS_FILE), { recursive: true });
        }
        let db = fs.existsSync(this.REG_IPS_FILE)
            ? JSON.parse(fs.readFileSync(this.REG_IPS_FILE, 'utf-8')) : {};
        let records = db[userId] || [];
        const details = this.getTierDetails(plan);
        // Check if IP exists (handling both string and object types)
        const existingIdx = records.findIndex(r => (typeof r === 'string' ? r : r.ip) === currentIp);
        if (existingIdx !== -1) {
            ipRotationPolicy_1.IpRotationPolicy.touch(userId, currentIp);
            return true;
        }
        if (records.length < details.slots) {
            records.push({ ip: currentIp, lastSeen: Date.now() });
            db[userId] = records;
            fs.writeFileSync(this.REG_IPS_FILE, JSON.stringify(db, null, 2));
            immutableAuditLog_1.ImmutableAuditLog.append("IP_AUTO_REGISTERED", { userId, ip: currentIp, plan });
            return true;
        }
        immutableAuditLog_1.ImmutableAuditLog.append("SLOT_EXCEEDED_BAN", { userId, ip: currentIp, plan, limit: details.slots });
        this.triggerInternalSeizure(userId);
        return false;
    }
    static applyPardon(token) {
        const payload = pardonService_1.PardonService.validate(token);
        if (!payload)
            return { allowed: false, message: "INVALID_OR_EXPIRED_PARDON" };
        const { userId, ip } = payload;
        let db = fs.existsSync(this.REG_IPS_FILE)
            ? JSON.parse(fs.readFileSync(this.REG_IPS_FILE, "utf-8")) : {};
        let records = db[userId] || [];
        if (!records.some(r => (typeof r === 'string' ? r : r.ip) === ip)) {
            records.push({ ip: ip, lastSeen: Date.now() });
            db[userId] = records;
            fs.writeFileSync(this.REG_IPS_FILE, JSON.stringify(db, null, 2));
        }
        if (fs.existsSync(this.LOCK_FILE))
            fs.unlinkSync(this.LOCK_FILE);
        immutableAuditLog_1.ImmutableAuditLog.append("PARDON_APPLIED", { userId, ip });
        return { allowed: true, message: "PARDON_APPLIED_SUCCESSFULLY" };
    }
    static async verifySystemIntegritas(plan, userId, signature, currentIp, allowedIps) {
        if (fs.existsSync(this.LOCK_FILE)) {
            this.detectTamperingDuringLock();
            return false;
        }
        const expected = crypto.createHmac('sha256', this.SECRET_SALT).update(`${plan}:${userId}`).digest('hex');
        if (expected !== signature) {
            if (!allowedIps.includes(currentIp)) {
                this.handleExternalAttack(userId, currentIp);
            }
            else {
                this.triggerInternalSeizure(userId);
            }
            return false;
        }
        return true;
    }
    static handleExternalAttack(userId, intruderIp) {
        if (fs.existsSync(this.MEMORY_FILE))
            fs.writeFileSync(this.MEMORY_FILE, crypto.randomBytes(2048).toString('hex'));
        const lockData = { status: "SECURED_BY_MASTER", userId, message: "Security Alert: Serangan luar terdeteksi." };
        fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
    }
    static triggerInternalSeizure(userId) {
        if (fs.existsSync(this.MEMORY_FILE)) {
            const rawData = fs.readFileSync(this.MEMORY_FILE, 'utf-8');
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.ALGORITHM, this.MASTER_RECOVERY_KEY, iv);
            let encrypted = cipher.update(rawData, 'utf8', 'hex') + cipher.final('hex');
            fs.writeFileSync(this.MEMORY_FILE, iv.toString('hex') + ":" + encrypted);
        }
        const lockData = { status: "BANNED", userId, fine: "1000 USD", message: "Pelanggaran Lisensi." };
        fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
    }
    static detectTamperingDuringLock() {
        const lockInfo = JSON.parse(fs.readFileSync(this.LOCK_FILE, 'utf-8'));
        if (lockInfo.status === "BANNED") {
            fs.writeFileSync(this.MEMORY_FILE, crypto.randomBytes(1024).toString('hex'));
            fs.writeFileSync(this.LOCK_FILE, JSON.stringify({ status: "DESTROYED_BEYOND_REPAIR" }));
        }
    }
    static generateDeliveryPackage(userId, officeIp) {
        return { credentials: { user: `ARIES_RECOVERY_${crypto.randomBytes(2).toString('hex').toUpperCase()}`, pass: crypto.randomBytes(16).toString('base64') }, security: { lockedToIp: officeIp } };
    }
}
exports.LicenseGuardian = LicenseGuardian;
LicenseGuardian.SECRET_SALT = 'MASTER_SECRET_KEY_ARIES';
LicenseGuardian.LOCK_FILE = path.join(process.cwd(), '.sys_lock');
LicenseGuardian.MEMORY_FILE = path.join(process.cwd(), 'sovereign_memory.json');
LicenseGuardian.REG_IPS_FILE = path.join(process.cwd(), 'data', 'registered_ips.json');
LicenseGuardian.ALGORITHM = 'AES-256-CBC';
LicenseGuardian.MASTER_RECOVERY_KEY = crypto.scryptSync('MASTER_RECOVERY_KEY_1000_USD', 'salt', 32);
