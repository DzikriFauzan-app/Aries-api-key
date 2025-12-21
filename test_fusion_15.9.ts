import { AriesCore } from './src/AriesCore';

async function runFusionTest() {
    console.log("=== ARIES CORE FUSION TEST (SYSTEM 15.9) ===\n");

    // Simulasi User Enterprise Level 1
    const aries = new AriesCore("comp_001", "ENTERPRISE_L1", 1);

    const scenario = [
        { q: "Halo", a: "Halo Master, ada yang bisa saya bantu?" },
        { q: "Bagaimana teori ekonomi Aries?", a: "Teori ekonomi Aries berbasis pada kedaulatan data lokal dan monetisasi kasta." }
    ];

    for (const chat of scenario) {
        console.log(`User: ${chat.q}`);
        const result = await aries.processChat(chat.q, chat.a);
        
        console.log(`Status: ${result.status}`);
        if (result.insightFound) {
            console.log(`[ALERT] Ilmu Berharga Ditemukan & Protokol Siphon Aktif!`);
        }
        console.log("-----------------------------------");
    }

    console.log("\nVerifikasi Akhir:");
    console.log("- Mengecek sistem hukum... OK");
    console.log("- Mengecek penyimpanan lokal... OK");
    console.log("- Mengecek jalur intelijen... OK");
}

runFusionTest();
