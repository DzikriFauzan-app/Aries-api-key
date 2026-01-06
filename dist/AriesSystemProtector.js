"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
class AriesAgent {
    constructor() {
        this.name = "Aries System Protector v2";
        this.suspiciousPatterns = ['eval(', 'exec(', 'base64_decode', 'process.env.SECRET'];
    }
    // 1. Fungsi Scan Rekursif (Anti-Error EISDIR)
    scanDirectory(dirPath) {
        const files = fs_1.default.readdirSync(dirPath);
        files.forEach(file => {
            const fullPath = path_1.default.join(dirPath, file);
            const stats = fs_1.default.statSync(fullPath);
            if (stats.isDirectory()) {
                this.scanDirectory(fullPath); // Masuk ke folder (Rekursif)
            }
            else if (file.endsWith('.ts') || file.endsWith('.js')) {
                this.checkFileContent(fullPath);
            }
        });
    }
    checkFileContent(filePath) {
        const content = fs_1.default.readFileSync(filePath, 'utf8');
        this.suspiciousPatterns.forEach(pattern => {
            if (content.includes(pattern) && !filePath.includes('AriesSystemProtector')) {
                console.warn(`⚠️ [ALERT] Suspicious pattern "${pattern}" found in: ${filePath}`);
            }
        });
    }
    async checkConnectivity() {
        console.log("🔍 [AGENT] Testing Bridge to APK Connection...");
        // Cek port lokal (Termux) atau remote (Codespaces)
        (0, child_process_1.exec)('curl -s http://localhost:3000/health', (err, stdout) => {
            if (err)
                console.log("ℹ️ [AGENT] Local Aries (3000) not reachable, this is normal if using Cloud Bridge.");
        });
    }
    run() {
        console.log(`🛡️ Starting ${this.name}...`);
        this.checkConnectivity();
        this.scanDirectory('./src');
        console.log("✅ [AGENT] System Scan Complete.");
    }
}
new AriesAgent().run();
