"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestorationVault = void 0;
class RestorationVault {
    static async initiateRestoration(userId, tier) {
        console.log(`[MASTER] Memulai Protokol Pemulihan Berlapis: ${userId}`);
        // ... (Layer 1-3: Email, SMS, Fingerprint)
        if (tier === 'ENTERPRISE') {
            console.log("[SECURITY] Menjalankan AI Face Detection...");
            // Jika AI gagal (False Positive)
            this.handleAIFailure(userId);
        }
    }
    static handleAIFailure(userId) {
        console.log("\n[ALERT] AI mendeteksi wajah sebagai Deepfake/Bukan Asli.");
        console.log("[PROTOCOL] Mengaktifkan Jalur Darurat: Secret Code Verification.");
        console.log(`[INSTRUCTION] Manajer/Karyawan Rahasia harus menghubungi CS dengan 'Secret Key' yang terdaftar.`);
    }
    static verifyManualOverride(inputCode, savedCode) {
        if (inputCode === savedCode) {
            this.verificationState.manualSecretCodeVerified = true;
            console.log("[SUCCESS] Secret Code Valid. Bypass AI Detection disetujui.");
            return true;
        }
        return false;
    }
    static verifyAll(tier) {
        const basic = this.verificationState.emailVerified && this.verificationState.smsOtpVerified;
        // Jika Jalur Darurat (Secret Code) sukses, AI Face Detection bisa diabaikan
        if (this.verificationState.manualSecretCodeVerified) {
            return basic;
        }
        if (tier === 'ENTERPRISE') {
            return basic && this.verificationState.aiFaceDetectionPassed;
        }
        return basic;
    }
}
exports.RestorationVault = RestorationVault;
RestorationVault.verificationState = {
    emailVerified: false,
    smsOtpVerified: false,
    fingerprintMatched: false,
    managerVideoVerified: false,
    aiFaceDetectionPassed: false,
    manualSecretCodeVerified: false // Jalur darurat
};
