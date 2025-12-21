import { LicenseGuardian } from './src/memory/licenseGuardian';

console.log("=== ARIES SECURITY TEST: ANTI-TAMPER ===\n");

const userId = "USER_007";
const realPlan = "FREE";

// 1. Simulasi Server Master memberikan lisensi resmi
console.log("Server Master: Memberikan lisensi FREE...");
const sig = LicenseGuardian.generateSignature(realPlan, userId);
LicenseGuardian.saveSecureLicense(realPlan, userId, sig);

// 2. Simulasi User mencoba nge-hack mengubah FREE ke PRO secara manual
console.log("Hacker: Mencoba mengubah file license.key menjadi PRO...");
const fakePlan = "PRO"; 

// 3. Verifikasi oleh Aries Core
const isLegit = LicenseGuardian.verifyLicense(fakePlan, userId, sig);

if (!isLegit) {
    console.log("[CRITICAL] Manipulasi Terdeteksi! Lisensi tidak valid.");
    console.log("Tindakan: Downgrade otomatis ke FREE atau Lock Access.");
} else {
    console.log("[SUCCESS] Lisensi Valid.");
}
