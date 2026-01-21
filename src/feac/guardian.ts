import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

const TARGET_DIR = path.join(process.env.HOME || "", "Aries-api-key/src/synapse");
const BACKUP_DIR = path.join(process.env.HOME || "", ".aries_backup");

// Membuat backup otomatis saat guardian aktif
if (!fs.existsSync(BACKUP_DIR)) {
    exec(`cp -r ${TARGET_DIR} ${BACKUP_DIR}`);
}

console.log("🛡️ ARIES GUARDIAN: Memantau integritas saraf...");

fs.watch(TARGET_DIR, { recursive: true }, (eventType, filename) => {
    if (filename) {
        console.log(`⚠️ Deteksi perubahan pada: ${filename}`);
        // Jika file dihapus atau ukurannya menjadi mencurigakan (sampah)
        const fullPath = path.join(TARGET_DIR, filename);
        const backupPath = path.join(BACKUP_DIR, filename);

        if (!fs.existsSync(fullPath) || fs.statSync(fullPath).size < 10) {
            console.log(`🛑 Sabotase terdeteksi! Melakukan Rollback pada ${filename}...`);
            exec(`cp ${backupPath} ${fullPath}`);
        }
    }
});
