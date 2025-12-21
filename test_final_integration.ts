import { AriesCore } from './src/AriesCore';
import * as fs from 'fs';

async function runFinalTest() {
    console.log("=== ARIES FINAL INTEGRATION TEST (SECURITY + CORE) ===\n");

    const userId = "USER_REBEL_01";
    const fakeSignature = "SIGNATURE_PALSU_123";

    // 1. Inisialisasi AriesCore dengan signature palsu (Upaya Hacking)
    console.log("Scenario 1: User mencoba masuk dengan Signature Palsu...");
    const aries = new AriesCore(userId, "PRO", fakeSignature);

    const result1 = await aries.processChat("Halo", "Respon dummy");
    console.log(`Status: ${result1.status}`);
    console.log(`Message: ${result1.message}\n`);

    // 2. Coba kirim pesan lagi setelah kena Lock
    console.log("Scenario 2: User yang sudah kena Lock mencoba kirim pesan lagi...");
    const result2 = await aries.processChat("Saya minta maaf, buka kuncinya!", "Respon dummy");
    console.log(`Status: ${result2.status}`);
    console.log(`Message: ${result2.message}`);

    // Verifikasi keberadaan file hukuman
    if (fs.existsSync('.sys_lock')) {
        console.log("\n[VERIFIED] File .sys_lock tetap ada. Hukuman bersifat permanen.");
    }
}

runFinalTest();
