import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function runTest() {
    console.log("=== ARIES HIGH-STAKES RECOVERY TEST ===\n");
    const originalData = JSON.stringify({ project: "Teori Ekonomi Aries", secret: "Aries Sovereign" });
    fs.writeFileSync('sovereign_memory.json', originalData);

    console.log("1. Data Awal: " + originalData);

    // SIMULASI HACK
    console.log("\n2. [HACK] User mencoba curang...");
    LicenseGuardian.verifyAndProtect("PRO", "USER_RICH", "WRONG_SIG");
    console.log("Status: Data sekarang terenkripsi (User tidak bisa baca).");

    // SIMULASI BAYAR 1000 USD
    console.log("\n3. [PAYMENT] User membayar denda $1000...");
    console.log("4. [MASTER ACTION] Menjalankan fungsi Restore...");
    const success = LicenseGuardian.restoreData();

    if (success) {
        const restored = fs.readFileSync('sovereign_memory.json', 'utf-8');
        console.log("\n5. Hasil Dekripsi: " + restored);
        if (restored === originalData) {
            console.log("\n[RESULT] DATA KEMBALI 100% UTUH. Transaksi Berhasil!");
        }
    }
}
runTest();
