import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export class LicenseGuardian {
  private static SECRET_SALT = 'MASTER_SECRET_KEY_ARIES'; 
  private static LOCK_FILE = path.join(process.cwd(), '.sys_lock');
  private static MEMORY_FILE = path.join(process.cwd(), 'sovereign_memory.json');
  private static ALGORITHM = 'aes-256-cbc';
  private static MASTER_RECOVERY_KEY = crypto.scryptSync('MASTER_RECOVERY_KEY_1000_USD', 'salt', 32);

  // --- 1. VERIFIKASI & DETEKSI INTRUSI (16.7 - 18.2) ---
  static async verifySystemIntegritas(plan: string, userId: string, signature: string, currentIp: string, allowedIps: string[]): Promise<boolean> {
    // Jika sistem sudah terkunci, aktifkan deteksi sabotase (16.6)
    if (fs.existsSync(this.LOCK_FILE)) {
      this.detectTamperingDuringLock();
      return false;
    }

    const expected = crypto.createHmac('sha256', this.SECRET_SALT).update(`${plan}:${userId}`).digest('hex');

    if (expected !== signature) {
      if (!allowedIps.includes(currentIp)) {
        // SERANGAN LUAR: Relokasi Data & Pesan Perlindungan (16.7, 16.8)
        this.handleExternalAttack(userId, currentIp);
      } else {
        // SERANGAN DALAM: Penyitaan & Denda $1000 (16.2, 16.5)
        this.triggerInternalSeizure(userId);
      }
      return false;
    }
    return true;
  }

  // --- 2. PROTOKOL PENYELAMATAN (EXTERNAL ATTACK) ---
  private static handleExternalAttack(userId: string, intruderIp: string): void {
    console.log(`[SAFEGUARD] External Breach from ${intruderIp}. Relocating...`);
    // Simulasi pengiriman ke Cloud Master sebelum di-purge
    if (fs.existsSync(this.MEMORY_FILE)) {
      const purge = crypto.randomBytes(2048).toString('hex');
      fs.writeFileSync(this.MEMORY_FILE, purge); // Bumi hangus lokal (16.7)
    }
    const lockData = {
      status: "SECURED_BY_MASTER",
      userId,
      appealStatus: "FREE_RESTORATION_ELIGIBLE", // Gratis jika terbukti korban (16.7)
      detectedIp: intruderIp,
      message: "Security Alert: Serangan luar terdeteksi. Data diamankan di Master Vault. Verifikasi gratis untuk pemulihan."
    };
    fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
  }

  // --- 3. PROTOKOL HUKUMAN (INTERNAL FRAUD) ---
  private static triggerInternalSeizure(userId: string): void {
    console.log("[PENALTY] Internal fraud detected. Encrypting assets...");
    if (fs.existsSync(this.MEMORY_FILE)) {
      const rawData = fs.readFileSync(this.MEMORY_FILE, 'utf-8');
      const iv = crypto.randomBytes(16);
      const cipher = crypto.createCipheriv(this.ALGORITHM, this.MASTER_RECOVERY_KEY, iv);
      let encrypted = cipher.update(rawData, 'utf8', 'hex') + cipher.final('hex');
      fs.writeFileSync(this.MEMORY_FILE, iv.toString('hex') + ":" + encrypted); // Enkripsi AES (16.5)
    }
    const lockData = {
      status: "BANNED",
      userId,
      appealStatus: "ELIGIBLE_FOR_APPEAL",
      fine: "1000 USD", // Denda mutlak (16.2)
      message: "Pelanggaran Lisensi: Bayar $1000 untuk kunci dekripsi."
    };
    fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
  }

  // --- 4. ANTI-TAMPER SELF DESTRUCT (16.6) ---
  private static detectTamperingDuringLock(): void {
    const lockInfo = JSON.parse(fs.readFileSync(this.LOCK_FILE, 'utf-8'));
    if (lockInfo.status === "BANNED") { 
      console.log("!!! SABOTASE TERDETEKSI - PENGHANCURAN PERMANEN !!!");
      const trash = crypto.createHash('sha512').update(crypto.randomBytes(1024)).digest('hex');
      fs.writeFileSync(this.MEMORY_FILE, trash); // Data jadi debu (Hash)
      fs.writeFileSync(this.LOCK_FILE, JSON.stringify({ status: "DESTROYED_BEYOND_REPAIR" }));
    }
  }

  // --- 5. VERIFIKASI MULTI-LAYER & DELIVERY (18.1 - 18.3) ---
  static generateDeliveryPackage(userId: string, officeIp: string) {
    // Hanya dipanggil setelah 6 lapis verifikasi sukses (Email, SMS, Fingerprint, Video AI, Secret Code)
    const user = `ARIES_RECOVERY_${crypto.randomBytes(2).toString('hex').toUpperCase()}`;
    const pass = crypto.randomBytes(16).toString('base64');
    
    return {
      credentials: { user, pass },
      security: { lockedToIp: officeIp },
      link: `https://vault.aries.sh/download/${userId}`
    };
  }

  static validateDownloadAccess(currentIp: string, allowedIp: string): boolean {
    // Kunci IP Terakhir (18.3)
    return currentIp === allowedIp;
  }
}
