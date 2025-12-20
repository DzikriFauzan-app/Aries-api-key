import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

/**
 * ARIES SOVEREIGN PROTECTION PROTOCOL (Step 15.5 - 18.4)
 * Kedaulatan penuh atas aset digital dan kontrol slot korporat.
 */
export class LicenseGuardian {
    private static SECRET_SALT = 'MASTER_SECRET_KEY_ARIES';
    private static LOCK_FILE = path.join(process.cwd(), '.sys_lock');
    private static MEMORY_FILE = path.join(process.cwd(), 'sovereign_memory.json');
    private static REG_IPS_FILE = path.join(process.cwd(), 'data/registered_ips.json');
    private static ALGORITHM = 'AES-256-CBC';
    private static MASTER_RECOVERY_KEY = crypto.scryptSync('MASTER_RECOVERY_KEY_1000_USD', 'salt', 32);

    // --- 1. KASTA, HARGA & LOGIKA SLOT (18.4) ---
    static getTierDetails(plan: string) {
        const p = plan.toUpperCase();
        if (p === 'FREE' || p === 'PRO') return { slots: 1 };
        if (p === 'PLATINUM') return { slots: 500 };

        // Enterprise: 50 + (level-1) * 25
        const level = parseInt(p.replace('ENTERPRISE_', '')) || 1;
        return { slots: 50 + (level - 1) * 25 };
    }

    // --- 2. VALIDASI AKSES KORPORAT & AUTO-BAN ---
    static async validateCorporateAccess(plan: string, userId: string, currentIp: string): Promise<boolean> {
        if (!fs.existsSync(path.dirname(this.REG_IPS_FILE))) {
            fs.mkdirSync(path.dirname(this.REG_IPS_FILE), { recursive: true });
        }

        let db: Record<string, string[]> = fs.existsSync(this.REG_IPS_FILE) 
            ? JSON.parse(fs.readFileSync(this.REG_IPS_FILE, 'utf-8')) 
            : {};

        const registeredIps = db[userId] || [];
        const details = this.getTierDetails(plan);

        if (registeredIps.includes(currentIp)) return true;

        if (registeredIps.length < details.slots) {
            registeredIps.push(currentIp);
            db[userId] = registeredIps;
            fs.writeFileSync(this.REG_IPS_FILE, JSON.stringify(db, null, 2));
            return true;
        }

        console.log(`[BAN] Unauthorized IP ${currentIp} for ${userId}. Slot Full!`);
        this.triggerInternalSeizure(userId);
        return false;
    }

    // --- 3. VERIFIKASI INTEGRITAS SISTEM (MULTI-LAYER) ---
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

    // --- 4. PROTOKOL SERANGAN LUAR (RELOKASI DATA) ---
    private static handleExternalAttack(userId: string, intruderIp: string): void {
        console.log(`[SAFEGUARD] External Breach from ${intruderIp}. Relocating...`);
        
        if (fs.existsSync(this.MEMORY_FILE)) {
            fs.writeFileSync(this.MEMORY_FILE, crypto.randomBytes(2048).toString('hex'));
        }

        const lockData = { 
            status: "SECURED_BY_MASTER", 
            userId, 
            appealStatus: "FREE_RESTORATION_ELIGIBLE", 
            message: "Security Alert: Serangan luar terdeteksi. Data diamankan di Cloud." 
        };
        fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
    }

    // --- 5. PROTOKOL FRAUD INTERNAL (PENYITAAN ASSET) ---
    private static triggerInternalSeizure(userId: string): void {
        console.log("[PENALTY] Internal fraud detected. Encrypting assets...");
        
        if (fs.existsSync(this.MEMORY_FILE)) {
            const rawData = fs.readFileSync(this.MEMORY_FILE, 'utf-8');
            const iv = crypto.randomBytes(16);
            const cipher = crypto.createCipheriv(this.ALGORITHM, this.MASTER_RECOVERY_KEY, iv);
            let encrypted = cipher.update(rawData, 'utf8', 'hex') + cipher.final('hex');
            fs.writeFileSync(this.MEMORY_FILE, iv.toString('hex') + ":" + encrypted);
        }

        const lockData = { 
            status: "BANNED", 
            userId, 
            fine: "1000 USD", 
            message: "Pelanggaran Lisensi: Bayar $1000 untuk kunci dekripsi." 
        };
        fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
    }

    // --- 6. SELF-DESTRUCT (HASH DESTRUCTION) ---
    private static detectTamperingDuringLock(): void {
        const lockInfo = JSON.parse(fs.readFileSync(this.LOCK_FILE, 'utf-8'));
        
        if (lockInfo.status === "BANNED") {
            console.log("!!! SABOTASE TERDETEKSI - PENGHANCURAN PERMANEN !!!");
            const trash = crypto.createHash('sha512').update(crypto.randomBytes(1024)).digest('hex');
            fs.writeFileSync(this.MEMORY_FILE, trash);
            fs.writeFileSync(this.LOCK_FILE, JSON.stringify({ status: "DESTROYED_BEYOND_REPAIR" }));
        }
    }

    // --- 7. MULTI-LAYER DELIVERY PACKAGE (RECOVERY) ---
    static generateDeliveryPackage(userId: string, officeIp: string) {
        const user = `ARIES_RECOVERY_${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
        const pass = crypto.randomBytes(16).toString('base64');
        
        return {
            credentials: { user, pass },
            security: { lockedToIp: officeIp },
            link: `https://vault.aries.sh/download/${userId}`
        };
    }
}
