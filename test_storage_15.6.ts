import { LocalQuotaManager } from './src/memory/localQuota';
import { LocalSovereignStorage } from './src/memory/localSovereign';
import * as fs from 'fs';

async function runTest() {
    console.log("=== ARIES STORAGE & QUOTA TEST 15.6 ===\n");

    // 1. Test Penulisan Memori Lokal
    console.log("Testing Local Memory Write...");
    LocalSovereignStorage.save("Logika arsitektur Aries adalah Hybrid Sovereign.", { category: "theory" });
    const count = LocalSovereignStorage.getCount();
    console.log(`- Memori tersimpan. Total slot terisi: ${count}`);

    // 2. Test Quota Persistence (Menulis ke File)
    console.log("\nTesting Quota Disk Persistence...");
    await LocalQuotaManager.checkAndIncrement(40); // Chat ke-1
    await LocalQuotaManager.checkAndIncrement(40); // Chat ke-2
    console.log("- 2 Chat telah didaftarkan ke quota_tracker.json");

    // 3. Verifikasi Keberadaan File
    console.log("\nVerifying Files on Termux Storage:");
    const files = ['sovereign_memory.json', 'quota_tracker.json'];
    files.forEach(file => {
        if (fs.existsSync(file)) {
            const size = fs.statSync(file).size;
            console.log(`[OK] ${file} ditemukan (${size} bytes)`);
        } else {
            console.log(`[FAIL] ${file} TIDAK ditemukan!`);
        }
    });
}

runTest();
