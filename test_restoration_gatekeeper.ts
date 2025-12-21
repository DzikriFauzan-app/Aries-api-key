import { RestorationVault } from './src/memory/restorationVault';

async function testRestore() {
    console.log("=== ARIES RESTORATION GATEKEEPER TEST ===\n");

    const userTier = "ENTERPRISE";
    const userId = "MEGA_CORP_01";

    console.log("Skenario: Perusahaan besar meminta restore data.");
    await RestorationVault.initiateRestoration(userId, userTier);

    console.log("\n[SYSTEM] Mencoba bypass tanpa Video Call Manager...");
    const isSuccess = RestorationVault.verifyAll(userTier);

    if (!isSuccess) {
        console.log("\n[RESULT] RESTORE DITOLAK: Verifikasi Lapis Akhir (Video Call AI) Belum Terpenuhi.");
    } else {
        console.log("\n[RESULT] DATA DIKIRIM DARI VAULT.");
    }
}

testRestore();
