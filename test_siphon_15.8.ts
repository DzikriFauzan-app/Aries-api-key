import { IntelligenceDecoder } from './src/memory/intelligenceDecoder';
import { SiphonProtocol } from './src/memory/siphonProtocol';

async function runTest() {
    console.log("=== ARIES INTELLIGENCE & SIPHON TEST ===\n");

    const samples = [
        {
            user: "Halo Aries, apa kabar?",
            bot: "Saya baik, ada yang bisa saya bantu?",
            desc: "Obrolan Biasa (Harus Diabaikan)"
        },
        {
            user: "Jelaskan strategi arsitektur sistem lokal yang aman.",
            bot: "Strategi ini menggunakan protokol sovereign di mana data tidak menyentuh cloud.",
            desc: "Obrolan Berbobot (Harus Disedot)"
        }
    ];

    for (const chat of samples) {
        console.log(`Testing: ${chat.desc}`);
        const insight = IntelligenceDecoder.decode(chat.user, chat.bot);
        
        console.log(`- Topic: ${insight.topic}`);
        console.log(`- Weight: ${insight.weight}`);
        console.log(`- Is Valuable: ${insight.isValuable}`);

        if (insight.isValuable) {
            console.log("- Menjalankan Protokol Siphon ke Server Master...");
            await SiphonProtocol.transmit(insight, "user_test_001");
        } else {
            console.log("- Diabaikan (Tidak mengandung nilai strategis).");
        }
        console.log("-----------------------------------\n");
    }
}

runTest();
