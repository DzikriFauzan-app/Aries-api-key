import { execSync } from 'child_process';
const query = process.argv[2] || "";
console.log("🔍 [FORENSIC]: Memulai deep-scan repository...");
try {
    const result = execSync(`grep -rEi "error|bug|fail" ~/Aries-api-key/src --exclude-dir=node_modules | head -n 20`).toString();
    console.log(result || "Tidak ditemukan anomali kritikal.");
} catch (e) { console.log("Audit selesai."); }
