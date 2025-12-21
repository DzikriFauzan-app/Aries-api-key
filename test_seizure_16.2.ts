import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function runTest() {
    console.log("=== ARIES ASSET SEIZURE TEST (FIXED) ===\n");

    const userId = "USER_PRO_HACKER";
    const secretData = "DATA_RAHASIA_NEGARA_DAN_NASKAH_VIDEO_PENTING";

    // 1. Siapkan data awal
    fs.writeFileSync('sovereign_memory.json', secretData);
    console.log("File Memori Awal: " + fs.readFileSync('sovereign_memory.json', 'utf-8'));

    // 2. Eksekusi Hacking (Gunakan signature salah)
    console.log("\n[ACTION] User mencoba memalsukan lisensi PRO...");
    LicenseGuardian.verifyAndProtect("PRO", userId, "WRONG_SIGNATURE");

    // 3. Verifikasi apakah data sudah hancur (Ter-enkripsi)
    const contentAfter = fs.readFileSync('sovereign_memory.json', 'utf-8');
    
    console.log("\nFile Memori Setelah Ban:");
    if (contentAfter === secretData) {
        console.log("FAILED: Data masih bisa dibaca! Sistem gagal menyita aset.");
    } else {
        console.log("SUCCESS: Data telah menjadi sampah (HEX):");
        console.log(contentAfter.substring(0, 64) + "...");
    }

    // 4. Verifikasi Status di File Lock
    if (fs.existsSync('.sys_lock')) {
        const lockInfo = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
        console.log(`\nStatus Banding: ${lockInfo.appealStatus}`);
        console.log(`Denda: ${lockInfo.fineAmount}`);
        console.log(`Pesan: ${lockInfo.note}`);
    }
}

runTest();
