"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ROOT_DIR = path_1.default.join(process.env.HOME || "", "Aries-api-key");
const MIN_SCORE = 100;
function getQualityScore(code) {
    const highLevel = ["try", "catch", "async", "await", "import", "interface", "class", "Promise", "const", "let"];
    let score = 0;
    highLevel.forEach(ind => {
        const matches = code.match(new RegExp(ind, "g"));
        if (matches)
            score += matches.length * 15;
    });
    const lines = code.split('\n').filter(l => l.trim().length > 0).length;
    return score + (lines * 5);
}
function auditSystem(dir) {
    console.log(`🔍 [SYSTEM_AUDIT]: Menyisir ${dir}...`);
    const files = fs_1.default.readdirSync(dir);
    files.forEach(file => {
        const fullPath = path_1.default.join(dir, file);
        if (fs_1.default.lstatSync(fullPath).isDirectory()) {
            if (!["node_modules", ".git", "dist"].includes(file))
                auditSystem(fullPath);
        }
        else if (file.endsWith('.ts') || file.endsWith('.js') || file.endsWith('.sh')) {
            const code = fs_1.default.readFileSync(fullPath, 'utf-8');
            const score = getQualityScore(code);
            if (score < MIN_SCORE) {
                // Logika Pembeda: Apakah ini file penting atau sampah tes?
                const isTestFile = file.includes('test') || file.includes('sim_') || code.length < 50;
                if (isTestFile) {
                    console.log(`🗑️ [PURGE]: Menghapus file sampah: ${file} (Skor: ${score})`);
                    fs_1.default.unlinkSync(fullPath);
                }
                else {
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
