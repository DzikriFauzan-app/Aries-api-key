import { RestorationVault } from './src/memory/restorationVault';

async function runTest() {
    console.log("=== ARIES EMERGENCY OVERRIDE TEST ===\n");

    const userId = "MEGA_CORP_CEO";
    const SECRET_VAULT_CODE = "ARIES-777-EXCALIBUR"; // Kode rahasia terdaftar

    // 1. Inisiasi (AI Gagal)
    await RestorationVault.initiateRestoration(userId, "ENTERPRISE");

    // 2. Simulasi Manajer menghubungi CS dan memberikan kode
    console.log("\n[CS ACTION] Manajer memberikan kode rahasia via jalur telepon aman...");
    const inputFromManager = "ARIES-777-EXCALIBUR";
    
    const overrideSuccess = RestorationVault.verifyManualOverride(inputFromManager, SECRET_VAULT_CODE);

    // 3. Verifikasi Akhir
    if (overrideSuccess) {
        // Set basic auth to true for simulation
        (RestorationVault as any).verificationState.emailVerified = true;
        (RestorationVault as any).verificationState.smsOtpVerified = true;

        if (RestorationVault.verifyAll("ENTERPRISE")) {
            console.log("\n[RESULT] DATA PULIH: Akses diberikan melalui Jalur Override Master.");
        }
    } else {
        console.log("\n[RESULT] AKSES DITOLAK: Kode Rahasia Salah.");
    }
}

runTest();
