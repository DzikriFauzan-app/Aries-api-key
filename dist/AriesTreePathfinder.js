"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const ARIES_DIR = '/data/data/com.termux/files/home/Aries-api-key';
console.log("🕵️ [PATHFINDER] MEMBEDAH STRUKTUR REPO ARIES...");
function scanDeep(dir) {
    const items = fs_1.default.readdirSync(dir);
    for (const item of items) {
        const fullPath = path_1.default.join(dir, item);
        const stat = fs_1.default.statSync(fullPath);
        if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.git')) {
            scanDeep(fullPath);
        }
        else if (item.endsWith('.js') || item.endsWith('.ts')) {
            const content = fs_1.default.readFileSync(fullPath, 'utf8');
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
    const tree = (0, child_process_1.execSync)(`find ${ARIES_DIR} -maxdepth 2 -not -path '*/.*'`).toString();
    console.log(tree);
    console.log("\n--- MENCARI JEJAK PORT 3000 ---");
    scanDeep(ARIES_DIR);
}
catch (e) {
    console.error("❌ Gagal akses folder Aries.");
}
