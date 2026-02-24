console.log("🧠 [NEO_CORE V27]: Mengaktifkan memori 10k kedalaman.");
console.log("Analisis: Menggunakan logika kedaulatan untuk memproses instruksi.");

/** * @certified_v6_elite 
 * INTEGRASI TANGAN ARIES (HEALER)
 */
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export const sovereignHealer = async (targetPath: string) => {
    const fullTargetPath = targetPath.replace('~', process.env.HOME || '');
    console.log(`🛡️ [SOVEREIGN_GATE]: Memulai pembersihan di ${fullTargetPath}`);
    
    const agentPath = path.join(process.env.HOME || '', 'Aries-api-key/certify_agent.ts');
    
    if (!fs.existsSync(fullTargetPath)) return "TARGET_PATH_NOT_FOUND";

    const files = fs.readdirSync(fullTargetPath).filter(f => f.endsWith('.ts'));
    files.forEach(file => {
        const filePath = path.join(fullTargetPath, file);
        exec(`npx ts-node ${agentPath} "${filePath}"`, (err, stdout) => {
            if (!err && stdout) console.log(stdout);
        });
    });
    return "HEALING_SEQUENCE_INITIATED_V6";
}

// LOGIKA PEMROSESAN INSTRUKSI HEAL

async function executeLogic() {
    const input = process.argv[2] || "";
    if (input.toLowerCase().includes("heal") || input.toLowerCase().includes("perbaiki")) {
        const pathMatch = input.match(/[~\/][\w\.\-\/]+/);
        const targetPath = pathMatch ? pathMatch[0] : "~/Feac-ultimate-sovereign";
        
        console.log(`\n⚡ [NEO_CORE]: Instruksi HEAL dideteksi untuk ${targetPath}`);
        const result = await sovereignHealer(targetPath);
        console.log(`✅ [STATUS]: ${result}`);
        process.exit(0);
    }
}

executeLogic();

/** @logic_fix_v28_2 */
async function runNeoCore() {
    const input = process.argv[2] || "";
    if (input.toLowerCase().includes("heal") || input.toLowerCase().includes("perbaiki")) {
        // Ekstraksi Path
        const match = input.match(/[~\/][\w\.\-\/]+/);
        const target = match ? match[0] : "~/Feac-ultimate-sovereign";
        
        console.log(`\n🛡️ [NEO_CORE]: Memulai Protokol Healing pada ${target}`);
        try {
            const status = await sovereignHealer(target);
            console.log(`✅ [SYSTEM_REPORT]: ${status}`);
        } catch (err) {
            console.log(`❌ [SYSTEM_ERROR]: Gagal eksekusi healer.`);
        }
        process.exit(0);
    }
}

runNeoCore().catch(() => process.exit(1));
