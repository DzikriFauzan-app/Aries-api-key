import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function runTest() {
    console.log("=== ARIES PURGE TEST: TAMPER-PROOF ===\n");
    
    // 1. Simulasi Sitaan Aktif
    fs.writeFileSync('sovereign_memory.json', 'DATA_SITAAN_AES');
    fs.writeFileSync('.sys_lock', JSON.stringify({ integrityHash: "8e95079a49938e55e5a959146f40b8a3" })); // Hash manual untuk simulasi

    // 2. Simulasi Hacker mencoba merubah isi file sitaan (mencoba crack)
    console.log("[HACK] Hacker mencoba memodifikasi data sitaan...");
    fs.writeFileSync('sovereign_memory.json', 'USAHA_CRACK_DATA');

    // 3. Sistem mengecek integritas
    console.log("[SYSTEM] Mengecek integritas sebelum memproses...");
    LicenseGuardian.verifyAndProtect("FREE", "USER_HACKER", "FAKE");

    console.log("\nIsi file memori sekarang: " + fs.readFileSync('sovereign_memory.json', 'utf-8').substring(0, 32) + "...");
}
runTest();
