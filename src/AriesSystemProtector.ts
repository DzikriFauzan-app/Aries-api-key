import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

class AriesAgent {
    name: string = "Aries System Protector v2";
    suspiciousPatterns: string[] = ['eval(', 'exec(', 'base64_decode', 'process.env.SECRET'];

    // 1. Fungsi Scan Rekursif (Anti-Error EISDIR)
    scanDirectory(dirPath: string) {
        const files = fs.readdirSync(dirPath);
        
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            const stats = fs.statSync(fullPath);

            if (stats.isDirectory()) {
                this.scanDirectory(fullPath); // Masuk ke folder (Rekursif)
            } else if (file.endsWith('.ts') || file.endsWith('.js')) {
                this.checkFileContent(fullPath);
            }
        });
    }

    checkFileContent(filePath: string) {
        const content = fs.readFileSync(filePath, 'utf8');
        this.suspiciousPatterns.forEach(pattern => {
            if (content.includes(pattern) && !filePath.includes('AriesSystemProtector')) {
                console.warn(`⚠️ [ALERT] Suspicious pattern "${pattern}" found in: ${filePath}`);
            }
        });
    }

    async checkConnectivity() {
        console.log("🔍 [AGENT] Testing Bridge to APK Connection...");
        // Cek port lokal (Termux) atau remote (Codespaces)
        exec('curl -s http://localhost:3000/health', (err, stdout) => {
            if (err) console.log("ℹ️ [AGENT] Local Aries (3000) not reachable, this is normal if using Cloud Bridge.");
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
