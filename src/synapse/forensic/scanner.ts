import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const ROOT_DIR = path.join(process.env.HOME || "", "Aries-api-key");
const MIN_SCORE = 100;

function getQualityScore(code: string): number {
    const highLevel = ["try", "catch", "async", "await", "import", "interface", "class", "Promise", "const", "let"];
    let score = 0;
    highLevel.forEach(ind => {
        const matches = code.match(new RegExp(ind, "g"));
        if (matches) score += matches.length * 15;
    });
    const lines = code.split('\n').filter(l => l.trim().length > 0).length;
    return score + (lines * 5);
}

function auditSystem(dir: string) {
    console.log(`🔍 [SYSTEM_AUDIT]: Menyisir ${dir}...`);
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            if (!["node_modules", ".git", "dist"].includes(file)) auditSystem(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.sh')) {
            const code = fs.readFileSync(fullPath, 'utf-8');
            const score = getQualityScore(code);

            if (score < MIN_SCORE) {
                // Logika Pembeda: Apakah ini file penting atau sampah tes?
                const isTestFile = file.includes('test') || file.includes('sim_') || code.length < 50;
                
                if (isTestFile) {
                    console.log(`🗑️ [PURGE]: Menghapus file sampah: ${file} (Skor: ${score})`);
                    fs.unlinkSync(fullPath);
                } else {
                    console.log(`⚠️ [ADVISORY]: File ${file} memiliki kualitas rendah (Skor: ${score}).`);
                    console.log(`👉 Saran: Tambahkan penanganan error (try-catch) atau gunakan struktur Class/Async.`);
                }
            }
        }
    });
}

console.log("============================================================");
console.log("🛡️ ARIES SELF-AUDIT ENGINE STARTING...");
auditSystem(ROOT_DIR);
console.log("============================================================");
