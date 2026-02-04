import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log("🧠 [NEO_CORE_V28]: Otoritas Sovereign Diterima.");

async function run() {
    const input = process.argv[2] || "";
    const agentPath = path.join(process.env.HOME || '', 'Aries-api-key/certify_agent.ts');
    
    // Regex presisi untuk menangkap path Termux
    const paths = input.match(/\/data\/data\/com\.termux\/files\/home\/[^\s'"]+/g);

    if (paths) {
        console.log(`⚡ [SYSTEM]: Mengeksekusi HEAL pada ${paths.length} file.`);
        for (const f of paths) {
            if (fs.existsSync(f)) {
                try {
                    console.log(`🛠️ Evolusi: ${path.basename(f)}`);
                    const out = execSync(`npx ts-node ${agentPath} "${f}"`, { encoding: 'utf-8' });
                    console.log(out);
                } catch (e) { console.log(`❌ Gagal: ${path.basename(f)}`); }
            }
        }
    } else {
        console.log("⚠️ Target tidak ditemukan dalam transmisi.");
    }
}
run();
