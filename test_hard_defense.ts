import * as crypto from 'crypto';
import * as fs from 'fs';

// ENGINE KEAMANAN LANGSUNG
class LicenseGuardian {
    static ALLOWED_IPS = ['127.0.0.1'];
    static MEMORY_FILE = 'sovereign_memory.json';
    static LOCK_FILE = '.sys_lock';

    static handleAttack(ip: string) {
        console.log(`[ACTION] Detected Intruder from ${ip}. PURGING DATA...`);
        
        // 1. Relokasi (Simulasi)
        const currentData = fs.readFileSync(this.MEMORY_FILE, 'utf-8');
        
        // 2. Penghancuran Total
        const trash = crypto.randomBytes(512).toString('hex');
        fs.writeFileSync(this.MEMORY_FILE, trash);

        // 3. Status Lock
        const lockData = {
            status: "PROTECTED",
            appealStatus: "FREE_RESTORATION_ELIGIBLE",
            note: "External hacker detected. Data wiped for safety."
        };
        fs.writeFileSync(this.LOCK_FILE, JSON.stringify(lockData, null, 2));
    }
}

async function run() {
    console.log("=== ARIES HARD-DEFENSE SYSTEM TEST ===\n");

    // Persiapan
    fs.writeFileSync('sovereign_memory.json', 'RAHASIA_NEGARA_ARIES');
    if (fs.existsSync('.sys_lock')) fs.unlinkSync('.sys_lock');

    console.log("Step 1: Data awal aman.");
    
    // Simulasi Serangan
    const intruderIp = "103.45.67.89";
    LicenseGuardian.handleAttack(intruderIp);

    // Verifikasi
    const finalData = fs.readFileSync('sovereign_memory.json', 'utf-8');
    console.log("\nStep 2: Mengecek data setelah serangan...");
    
    if (finalData === 'RAHASIA_NEGARA_ARIES') {
        console.log("RESULT: FAILED - Data masih utuh!");
    } else {
        console.log("RESULT: SUCCESS - Data telah menjadi sampah digital.");
        console.log("Isi file: " + finalData.substring(0, 32) + "...");
    }

    const lockInfo = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
    console.log("\nStep 3: Mengecek Status Hak Konsumen...");
    console.log("Appeal Status: " + lockInfo.appealStatus);
}

run();
