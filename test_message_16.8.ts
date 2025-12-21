import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function test() {
    console.log("=== ARIES GUARDIAN MESSAGE TEST ===\n");
    if (fs.existsSync('.sys_lock')) fs.unlinkSync('.sys_lock');
    fs.writeFileSync('sovereign_memory.json', 'DATA_PENTING');

    // Serangan luar
    LicenseGuardian.verifyWithIntrusionDetection("PRO", "USER_VIP", "WRONG", "1.2.3.4");

    const lock = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
    console.log("PESAN UNTUK USER:\n\"" + lock.message + "\"");
    console.log("\nStatus Biaya: " + (lock.appealStatus === 'FREE_RESTORATION_ELIGIBLE' ? "GRATIS (S&K Berlaku)" : "BAYAR $1000"));
}
test();
