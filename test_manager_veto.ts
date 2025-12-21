import { DeviceVerifier } from "./src/billing/deviceVerifier";
import { BlacklistStore } from "./src/billing/blacklistStore";

console.log("=== SCENARIO: MANAGER MENEKAN 'NO' ===");

const userId = "KARYAWAN_A";
const badIp = "10.10.10.254";

// 1. Inisiasi
DeviceVerifier.initiateIpVerification(userId, "ENTERPRISE_1", badIp);

// 2. Manajer menolak (Veto)
console.log("[MANAGER ACTION]: Menekan tombol 'NO'");
const result = DeviceVerifier.processManagerDecision(userId, badIp, false);

// 3. Cek apakah IP bisa didaftarkan lagi
console.log("\n=== SCENARIO: KARYAWAN MENCOBA LAGI SETELAH DITOLAK ===");
DeviceVerifier.initiateIpVerification(userId, "ENTERPRISE_1", badIp);
