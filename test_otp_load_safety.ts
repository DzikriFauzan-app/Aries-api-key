import { DeviceVerifier } from "./src/billing/deviceVerifier";
import { OtpLedger } from "./src/billing/otpLedger";

console.log("=== OTP LOAD SAFETY & ATTEMPT TEST ===");
const user = "U_TEST";
const ip = "1.2.3.4";
const codes = DeviceVerifier.initiateIpVerification(user, "PRO", ip) || [];

// 1. Test Gagal Beruntun (Brute Force Protection)
console.log("Simulasi Salah Password 3x...");
DeviceVerifier.verify(user, ip, ["0000"]);
DeviceVerifier.verify(user, ip, ["0000"]);
DeviceVerifier.verify(user, ip, ["0000"]);

console.log("Ledger Size after 3 fails:", OtpLedger.size()); 

// 2. Test TTL Purge (Manual Trigger)
DeviceVerifier.initiateIpVerification("U_EXPIRED", "PRO", "5.6.7.8");
console.log("Ledger Size before purge:", OtpLedger.size());
// Manipulasi waktu tidak dilakukan di test unit, tapi logic purge dipanggil
OtpLedger.purgeExpired();
