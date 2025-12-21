import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function runTest() {
    console.log("=== ARIES LOCKDOWN TEST: NO MERCY ===\n");

    const userId = "USER_REBEL_01";
    
    // 1. User mencoba manipulasi
    console.log("Step 1: User mencoba memalsukan lisensi...");
    const legit = LicenseGuardian.verifyAndProtect("PRO", userId, "FAKE_SIGNATURE");

    if (!legit) {
        console.log("Step 2: Sistem mendeteksi fraud. Mengecek status Lock...");
        if (LicenseGuardian.isLocked()) {
            console.log("RESULT: Perangkat berhasil di-LOCK secara permanen.");
        }
    }

    // 3. Coba akses lagi meskipun sudah 'tobat'
    console.log("\nStep 3: User mencoba masuk lagi dengan lisensi yang benar...");
    const tryAgain = LicenseGuardian.verifyAndProtect("FREE", userId, "ANY_SIGNATURE");
    if (!tryAgain && LicenseGuardian.isLocked()) {
        console.log("RESULT: Akses tetap ditolak. Sekali maling, selamanya terkunci.");
    }
}

runTest();
