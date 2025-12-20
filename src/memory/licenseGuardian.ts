import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';
import { PardonService } from "./pardonService";
import { ImmutableAuditLog } from "../audit/immutableAuditLog";
import { IpRotationPolicy } from "./ipRotationPolicy";

export class LicenseGuardian {
    private static SECRET_SALT = 'MASTER_SECRET_KEY_ARIES';
    private static LOCK_FILE = path.join(process.cwd(), '.sys_lock');
    private static MEMORY_FILE = path.join(process.cwd(), 'sovereign_memory.json');
    protected static REG_IPS_FILE = path.join(process.cwd(), 'data', 'registered_ips.json');
    private static ALGORITHM = 'AES-256-CBC';
    private static MASTER_RECOVERY_KEY = crypto.scryptSync('MASTER_RECOVERY_KEY_1000_USD', 'salt', 32);

    static getTierDetails(plan: string) {
        const p = plan.toUpperCase();
        if (p === 'FREE' || p === 'PRO') return { slots: 1 };
        if (p === 'PLATINUM') return { slots: 500 };
        const level = parseInt(p.replace('ENTERPRISE_', '')) || 1;
        return { slots: 50 + (level - 1) * 25 };
    }

    static async validateCorporateAccess(plan: string, userId: string, currentIp: string): Promise<boolean> {
        if (!fs.existsSync(path.dirname(this.REG_IPS_FILE))) {
            fs.mkdirSync(path.dirname(this.REG_IPS_FILE), { recursive: true });
        }
        let db: Record<string, any[]> = fs.existsSync(this.REG_IPS_FILE) 
            ? JSON.parse(fs.readFileSync(this.REG_IPS_FILE, 'utf-8')) : {};
        
        let records = db[userId] || [];
        const details = this.getTierDetails(plan);

        // Check if IP exists (handling both string and object types)
        const existingIdx = records.findIndex(r => (typeof r === 'string' ? r : r.ip) === currentIp);

        if (existingIdx !== -1) {
            IpRotationPolicy.touch(userId, currentIp);
            return true;
        }

        if (records.length < details.slots) {
            records.push({ ip: currentIp, lastSeen: Date.now() });
            db[userId] = records;
            fs.writeFileSync(this.REG_IPS_FILE, JSON.stringify(db, null, 2));
            ImmutableAuditLog.append("IP_AUTO_REGISTERED", { userId, ip: currentIp, plan });
            return true;
        }

        ImmutableAuditLog.append("SLOT_EXCEEDED_BAN", { userId, ip: currentIp, plan, limit: details.slots });
        this.triggerInternalSeizure(userId);
        return false;
    }

    static applyPardon(token: string): { allowed: boolean; message: string } {
        const payload = PardonService.validate(token);
        if (!payload) return { allowed: false, message: "INVALID_OR_EXPIRED_PARDON" };

        const { userId, ip } = payload;
        let db: Record<string, any[]> = fs.existsSync(this.REG_IPS_FILE) 
            ? JSON.parse(fs.readFileSync(this.REG_IPS_FILE, "utf-8")) : {};
        
        let records = db[userId] || [];
        if (!records.some(r => (typeof r === 'string' ? r : r.ip) === ip)) {
            records.push({ ip: ip, lastSeen: Date.now() });
            db[userId] = records;
            fs.writeFileSync(this.REG_IPS_FILE, JSON.stringify(db, null, 2));
        }

        if (fs.existsSync(this.LOCK_FILE)) fs.unlinkSync(this.LOCK_FILE);
        ImmutableAuditLog.append("PARDON_APPLIED", { userId, ip });
        return { allowed: true, message: "PARDON_APPLIED_SUCCESSFULLY" };
    }

    static async verifySystemIntegritas(plan: string, userId: string, signature: string, currentIp: string, allowedIps: string[]): Promise<boolean> {
        if (fs.existsSync(this.LOCK_FILE)) {
            this.detectTamperingDuringLock();
            return false;
        }
        const expected = crypto.createHmac('sha256', this.SECRET_SALT).update(`${plan}:${userId}`).digest('hex');
        if (expected !== signature) {
            if (!allowedIps.includes(currentIp)) {
                this.handleExternalAttack(userId, currentIp);
            } else {
                this.triggerInternalSeizure(userId);
            }
            return false;
        }
        return true;
    }

    private static handleExternalAttack(userId: string, intruderIp: string): void {
        if (fs.existsSync(this.MEMORY_FILE)) fs.writeFileSync(this.MEMORY_FILE, crypto.randomBytes(2048).toString('hex'));
        const lockData = { status: "SECURED_BY_MASTER", userId, message: "Security Alert: Serangan luar terdeteksi." };
        fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
    }

    private static triggerInternalSeizure(userId: string): void {
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

    private static detectTamperingDuringLock(): void {
        const lockInfo = JSON.parse(fs.readFileSync(this.LOCK_FILE, 'utf-8'));
        if (lockInfo.status === "BANNED") {
            fs.writeFileSync(this.MEMORY_FILE, crypto.randomBytes(1024).toString('hex'));
            fs.writeFileSync(this.LOCK_FILE, JSON.stringify({ status: "DESTROYED_BEYOND_REPAIR" }));
        }
    }

    static generateDeliveryPackage(userId: string, officeIp: string) {
        return { credentials: { user: `ARIES_RECOVERY_${crypto.randomBytes(2).toString('hex').toUpperCase()}`, pass: crypto.randomBytes(16).toString('base64') }, security: { lockedToIp: officeIp } };
    }
}
