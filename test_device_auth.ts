import { DeviceVerifier } from "./src/billing/deviceVerifier";

console.log("=== SCENARIO 1: USER PRO (Verifikasi via HP Utama) ===");
const masterCodes = DeviceVerifier.initiateIpVerification("USER_SOLO", "PRO", "192.168.1.50 (WiFi Rumah)");
console.log("Kode yang muncul di Redmi 12 Master:", masterCodes.join("-"));

const userPromptInput = masterCodes; // Simulasi user mengetik kode yang sama
const isOk = DeviceVerifier.verifyCodes(userPromptInput, masterCodes);
console.log("Status Akses WiFi Rumah:", isOk ? "✅ TERVERIFIKASI" : "❌ KODE SALAH");

console.log("\n=== SCENARIO 2: KARYAWAN ENTERPRISE (Minta Izin Manajer) ===");
DeviceVerifier.initiateIpVerification("STAFF_01", "ENTERPRISE_1", "172.16.0.5");
console.log("Hasil: OTP dikirim ke Dashboard Manajer. Karyawan tidak bisa bypass.");
