import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const ARIES_DIR = '/data/data/com.termux/files/home/Aries-api-key';

console.log("🕵️ [PATHFINDER] MEMBEDAH STRUKTUR REPO ARIES...");

function scanDeep(dir: string) {
    const items = fs.readdirSync(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
            scanDeep(fullPath);
        } else if (item.endsWith('.js') || item.endsWith('.ts')) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('3000')) {
                console.log(`🎯 DITEMUKAN: Port 3000 disebut di -> ${fullPath}`);
                // Cari apakah ada baris listen
                if (content.includes('.listen(')) {
                    console.log(`🔥 KRITIKAL: File ini kemungkinan besar adalah SERVER UTAMA.`);
                }
            }
        }
    }
}

try {
    console.log("--- FOLDER TREE ---");
    const tree = execSync(`find ${ARIES_DIR} -maxdepth 2 -not -path '*/.*'`).toString();
    console.log(tree);
    
    console.log("\n--- MENCARI JEJAK PORT 3000 ---");
    scanDeep(ARIES_DIR);
} catch (e) {
    console.error("❌ Gagal akses folder Aries.");
}
