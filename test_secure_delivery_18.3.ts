import { DeliverySystem } from './src/memory/deliverySystem';

async function runTest() {
    console.log("=== ARIES SECURE DELIVERY TEST ===\n");

    const userId = "MEGA_CORP_01";
    const OFFICE_IP = "202.152.1.50"; // IP Kantor yang didaftarkan
    const MANAGER_IP = "114.122.3.44"; // IP HP Pribadi Manajer
    
    // 1. Sukses Verifikasi & Generate Kredensial
    const session = DeliverySystem.generateSecureLink(userId, OFFICE_IP);

    // 2. Simulasi Percobaan Download dari IP Hacker (IP Salah)
    console.log("\nSkenario 1: Hacker mencoba mendownload dari IP 103.55.12.1...");
    const attempt1 = DeliverySystem.validateDownloadAccess("103.55.12.1", session.allowedIp, MANAGER_IP);
    if (!attempt1) console.log("=> HASIL: File Tetap Terkunci.");

    // 3. Simulasi Manajer mendownload dari IP Kantor (IP Benar)
    console.log("\nSkenario 2: Manajer mendownload dari IP Kantor...");
    const attempt2 = DeliverySystem.validateDownloadAccess(OFFICE_IP, session.allowedIp, MANAGER_IP);
    if (attempt2) console.log("=> HASIL: File Berhasil Didownload.");
}

runTest();
