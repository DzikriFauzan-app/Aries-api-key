import { DeviceVerifier } from "./src/billing/deviceVerifier";
import { IpActivator } from "./src/billing/ipActivator";

console.log("=== IP ACTIVATION COMMIT TEST (19.7) ===");

const userId = "USER_PRO_SOLO";
const plan = "PRO";
const ip = "192.168.1.100";

// STEP 1: Inisiasi OTP
const codes = DeviceVerifier.initiateIpVerification(userId, plan, ip);

if (codes) {
    // STEP 2: Commit Pertama (Harus Berhasil)
    const result = IpActivator.commitIp(userId, plan, ip, codes);
    console.log("Activation Result:", result.ok ? "✅ SUCCESS" : `❌ ${result.reason}`);

    // STEP 3: Replay Attempt (Harus Gagal karena OTP di Ledger sudah hancur)
    const replay = IpActivator.commitIp(userId, plan, ip, codes);
    console.log("Replay Attempt:", replay.ok ? "❌ FAILED (BUG)" : "✅ BLOCKED (OTP VOID)");
}
