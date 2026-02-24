"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
console.log("🧠 [NEO_CORE_V28]: Otoritas Sovereign Diterima.");
async function run() {
    const input = process.argv[2] || "";
    const agentPath = path_1.default.join(process.env.HOME || '', 'Aries-api-key/certify_agent.ts');
    // Regex presisi untuk menangkap path Termux
    const paths = input.match(/\/data\/data\/com\.termux\/files\/home\/[^\s'"]+/g);
    if (paths) {
        console.log(`⚡ [SYSTEM]: Mengeksekusi HEAL pada ${paths.length} file.`);
        for (const f of paths) {
            if (fs_1.default.existsSync(f)) {
                try {
                    console.log(`🛠️ Evolusi: ${path_1.default.basename(f)}`);
                    const out = (0, child_process_1.execSync)(`npx ts-node ${agentPath} "${f}"`, { encoding: 'utf-8' });
                    console.log(out);
                }
                catch (e) {
                    console.log(`❌ Gagal: ${path_1.default.basename(f)}`);
                }
            }
        }
    }
    else {
        console.log("⚠️ Target tidak ditemukan dalam transmisi.");
    }
}
run();
