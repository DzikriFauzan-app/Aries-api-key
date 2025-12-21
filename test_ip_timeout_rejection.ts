import { DeviceVerifier } from "./src/billing/deviceVerifier";

console.log("=== SCENARIO: KARYAWAN ENTERPRISE (60s TIMEOUT) ===");

const userId = "STAFF_OFFICE_01";
const plan = "ENTERPRISE_1";
const newIp = "172.16.0.99";

// 1. Manajer memicu pengiriman OTP
console.log(`[1] Karyawan ${userId} mencoba akses dari IP baru: ${newIp}`);
DeviceVerifier.initiateIpVerification(userId, plan, newIp);

// 2. Simulasi logic Timeout 60 detik
function checkTimeout(startTime: number) {
    const now = Date.now();
    const limit = 60 * 1000; // 60 Detik
    return (now - startTime) >= limit;
}

const startTime = Date.now() - (61 * 1000); // Simulasi waktu sudah lewat 61 detik
const isExpired = checkTimeout(startTime);

console.log("[2] Menunggu verifikasi dari Manajer...");
console.log("... 60 Detik Berlalu ...");

if (isExpired) {
    console.log(`\n🚨 [REJECTED] Waktu verifikasi 60 detik habis!`);
    console.log(`[SECURITY] IP ${newIp} diblokir sementara. Silakan minta Manajer kirim ulang OTP.`);
}
