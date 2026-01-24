import express from 'express';
import cors from 'cors';
import { KeyRegistry } from '../auth/keyRegistry';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';

const execAsync = promisify(exec);
const app = express();
const registry = new KeyRegistry();

app.use(cors(), express.json({ limit: '500mb' }));

const CONFIG = {
    PORT: 3001,
    SYNAPSE_DIR: path.join(process.env.HOME || "", "Aries-api-key/src/synapse")
};

class SovereignGateV28_1 {
    private evaluateQuality(newCode: string, oldCode: string): { pass: boolean, reason: string } {
        const indicators = ["try", "catch", "async", "await", "Promise", "CONFIG", "10000", "fs", "path"];
        let score_new = 0;
        let score_old = 0;

        indicators.forEach(ind => {
            if (newCode.includes(ind)) score_new++;
            if (oldCode.includes(ind)) score_old++;
        });

        if (newCode.length < oldCode.length * 0.4) return { pass: false, reason: "DEGRADASI_VOLUME: Kode terlalu dangkal." };
        if (score_new < score_old) return { pass: false, reason: "DEGRADASI_INTEGENSIA: Kehilangan penanganan error/logika." };

        return { pass: true, reason: "EVOLUSI_VALID" };
    }

    public async process(message: string) {
        // 1. HARD SECURITY: Proteksi penghapusan
        if (message.includes("rm ") || message.includes("delete")) {
             if (message.includes("synapse") || message.includes("Aries")) {
                 return "🛑 [SECURITY]: Upaya penghapusan organ vital diblokir!";
             }
        }

        // 2. QUALITY SENTINEL: Deteksi Overwrite (Targeting >, >>, atau cat <<)
        // Kita gunakan regex yang lebih kuat untuk menangkap path file
        const writeMatch = message.match(/(?:>|cat\s*<<\s*['"]?EOF['"]?)\s*([~/\w\.-]+)/);
        if (writeMatch) {
            let targetPath = writeMatch[1].replace("~", process.env.HOME || "");
            if (fs.existsSync(targetPath)) {
                const oldCode = fs.readFileSync(targetPath, 'utf-8');
                const evalResult = this.evaluateQuality(message, oldCode);
                
                if (!evalResult.pass) {
                    return `🛑 [QUALITY_BLOCKER]: Upaya menimpa ${path.basename(targetPath)} ditolak!\nAlasan: ${evalResult.reason}`;
                }
            }
        }

        // 3. DISPATCHER
        const q = message.toLowerCase();
        let agent = "reasoning/neoCore_v28.ts";
        if (q.includes("baca") || q.includes("pdf")) agent = "reasoning/scholar.ts";
        else if (q.includes("scan") || q.includes("bug")) agent = "forensic/scanner.ts";

        try {
            const { stdout } = await execAsync(`npx ts-node ${path.join(CONFIG.SYNAPSE_DIR, agent)} "${message}"`);
            return stdout || "Aksi Selesai.";
        } catch (e: any) {
            return `⚠️ Kegagalan Saraf: ${e.message}`;
        }
    }
}

const gate = new SovereignGateV28_1();
app.post('/api/v1/chat', async (req: any, res: any) => {
    const { apiKey, message } = req.body;
    if (!registry.validate(apiKey)) return res.status(401).json({ error: "Unauthorized" });
    res.json({ reply: await gate.process(message || ""), source: "ARIES_TITAN_V28.1" });
});
app.listen(CONFIG.PORT, '0.0.0.0', () => console.log("⚡ CNS V28.1 ONLINE"));
