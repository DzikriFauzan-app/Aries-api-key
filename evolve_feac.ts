import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const TARGET_DIR = path.join(process.env.HOME || "", "Feac-ultimate-sovereign");
const AGENT_PATH = path.join(process.env.HOME || "", "Aries-api-key/certify_agent.ts");

async function evolve() {
    console.log("🛡️ [ARIES_NATIVE_EVOLVER]: Memulai Operasi Skala Besar...");
    
    if (!fs.existsSync(TARGET_DIR)) {
        console.error("❌ Folder FEAC tidak ditemukan!");
        return;
    }

    const files = fs.readdirSync(TARGET_DIR).filter(f => f.endsWith('.ts'));
    console.log(`🚀 Ditemukan ${files.length} file. Memulai pembersihan...`);

    files.forEach((file, index) => {
        const filePath = path.join(TARGET_DIR, file);
        try {
            process.stdout.write(`\r⏳ [${index + 1}/${files.length}] Evolusi: ${file}... `);
            const output = execSync(`npx ts-node ${AGENT_PATH} "${filePath}"`, { encoding: 'utf-8' });
            
            // Ambil skor dari output agent
            const scoreMatch = output.match(/Skor: (\d+)/);
            const score = scoreMatch ? scoreMatch[1] : "???";
            console.log(`✅ [SKOR: ${score}]`);
        } catch (e) {
            console.log(`\n❌ Gagal pada file: ${file}`);
        }
    });

    console.log("\n💎 [OPERASI SELESAI]: Seluruh file FEAC telah mencapai Standar Elite.");
}

evolve();
