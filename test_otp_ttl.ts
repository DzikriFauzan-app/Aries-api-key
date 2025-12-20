import { DeviceVerifier } from "./src/billing/deviceVerifier";

console.log("=== OTP TTL & ONE-TIME TEST ===");

const codes = DeviceVerifier.initiateIpVerification(
  "USER_PRO", 
  "PRO", 
  "192.168.10.10"
);

if (codes) {
    // 1. Verifikasi Pertama (Harus OK)
    const ok1 = DeviceVerifier.verify("USER_PRO", "192.168.10.10", codes);
    console.log("First verify (Valid):", ok1 ? "✅ OK" : "❌ FAIL");

    // 2. Replay (Harus BLOCKED karena sudah dihapus dari Ledger)
    const ok2 = DeviceVerifier.verify("USER_PRO", "192.168.10.10", codes);
    console.log("Replay verify (Second Attempt):", ok2 ? "❌ VULNERABLE" : "✅ BLOCKED (SAFE)");
}
