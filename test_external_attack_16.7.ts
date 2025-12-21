import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function runTest() {
    console.log("=== ARIES CYBER-DEFENSE TEST (FIXED) ===\n");

    const userId = "CONSUMER_01";
    const attackerIp = "103.45.67.89"; // IP Hacker
    
    fs.writeFileSync('sovereign_memory.json', 'DATA_BERHARGA_KONSUMEN');
    console.log("1. Data di HP Konsumen: " + fs.readFileSync('sovereign_memory.json', 'utf-8'));

    // Eksekusi
    console.log("\n2. [ATTACK] Hacker mencoba masuk dari IP: " + attackerIp);
    LicenseGuardian.verifyWithIntrusionDetection("PRO", userId, "FAKE_SIG", attackerIp);

    // Verifikasi
    const localData = fs.readFileSync('sovereign_memory.json', 'utf-8');
    console.log("\n3. Data di HP Konsumen Sekarang:");
    if (localData === 'DATA_BERHARGA_KONSUMEN') {
        console.log("FAILED: Data tidak hancur!");
    } else {
        console.log("SUCCESS: Data telah dihancurkan (Purged): " + localData.substring(0, 32) + "...");
    }

    const lockInfo = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
    console.log(`\n4. Status Banding: ${lockInfo.appealStatus}`);
    console.log(`5. Pesan: ${lockInfo.note}`);
}

runTest();
