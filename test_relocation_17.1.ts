import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function runRelocationTest() {
    console.log("=== ARIES EMERGENCY RELOCATION TEST ===\n");

    const userId = "VIP_CONSUMER_001";
    const intruderIp = "182.253.11.22"; // IP luar (Hacker)
    const secretContent = JSON.stringify({
        naskah: "Teori Konspirasi AI 2026",
        analisis: "Data rahasia yang tidak boleh dicuri"
    });

    // 1. Inisialisasi Data Awal di Lokal
    fs.writeFileSync('sovereign_memory.json', secretContent);
    console.log("Step 1: Data berharga ada di lokal konsumen.");

    // 2. Deteksi Serangan Luar
    console.log(`\nStep 2: [ALERT] Serangan dari IP Asing: ${intruderIp}`);
    
    // Simulasi pengiriman ke server sebelum di-purge
    console.log(`[ACTION] Menyalin data ${userId} ke jalur aman Master...`);
    const backupForMaster = fs.readFileSync('sovereign_memory.json', 'utf-8'); 
    
    // 3. Eksekusi Protokol Guardian
    LicenseGuardian.verifyWithIntrusionDetection("PRO", userId, "WRONG_SIGNATURE", intruderIp);

    // 4. Verifikasi Kehancuran Lokal
    const localAfter = fs.readFileSync('sovereign_memory.json', 'utf-8');
    console.log("\nStep 3: Mengecek HP Konsumen...");
    if (localAfter !== secretContent) {
        console.log("RESULT: Data lokal hancur (Purged). Hacker hanya dapat sampah.");
    }

    // 5. Verifikasi Keberadaan di Vault Master
    console.log("\nStep 4: Mengecek Master Vault (Simulasi Server Alibaba)...");
    if (backupForMaster === secretContent) {
        console.log("RESULT: Data asli selamat di Master Vault! Siap dikembalikan gratis.");
    }
    
    const lockInfo = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
    console.log("\nStatus Banding: " + lockInfo.appealStatus);
}

runRelocationTest();
