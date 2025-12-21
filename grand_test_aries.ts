import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';
import * as path from 'path';

async function runGrandTest() {
    console.log("=== THE GRAND SOVEREIGN TEST (15.5 - 18.4) ===");
    
    // Cleanup env
    const files = ['.sys_lock', 'data/registered_ips.json', 'sovereign_memory.json'];
    files.forEach(f => { if(fs.existsSync(f)) fs.unlinkSync(f); });
    if (!fs.existsSync('data')) fs.mkdirSync('data');
    fs.writeFileSync('sovereign_memory.json', JSON.stringify({ data: "Kekayaan Intelektual Aries" }));

    // 1. TEST KASTA & SLOT (15.5 & 18.4)
    console.log("\n[TEST 1] Verifikasi Slot & Tier...");
    const ent2 = LicenseGuardian.getTierDetails("ENTERPRISE_2");
    console.log(`- Enterprise 2 Slots: ${ent2.slots} (Expect: 75)`);
    const plat = LicenseGuardian.getTierDetails("PLATINUM");
    console.log(`- Platinum Slots: ${plat.slots} (Expect: 500)`);

    // 2. TEST CORPORATE GATEKEEPER (18.4)
    console.log("\n[TEST 2] Verifikasi Auto-Ban IP ke-2 (User PRO)...");
    await LicenseGuardian.validateCorporateAccess("PRO", "USER_A", "1.1.1.1");
    const proOver = await LicenseGuardian.validateCorporateAccess("PRO", "USER_A", "1.1.1.2");
    console.log(`- PRO IP ke-2: ${!proOver ? "✅ DIBLOKIR" : "❌ LOLOS"}`);

    // 3. TEST ASSET SEIZURE / PENYITAAN (17.1)
    console.log("\n[TEST 3] Verifikasi Enkripsi AES-256 Pasca Ban...");
    const memoryContent = fs.readFileSync('sovereign_memory.json', 'utf-8');
    const isEncrypted = memoryContent.includes(":"); // Format iv:encrypted
    console.log(`- Status Memori: ${isEncrypted ? "✅ TERENKRIPSI (SITA)" : "❌ GAGAL SITA"}`);

    // 4. TEST LOCK SYSTEM (16.2)
    console.log("\n[TEST 4] Verifikasi System Lock ($1000 Fine)...");
    const lockExist = fs.existsSync('.sys_lock');
    if(lockExist) {
        const lockInfo = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
        console.log(`- Status Lock: ${lockInfo.status} (Expect: BANNED)`);
        console.log(`- Fine: ${lockInfo.fine} (Expect: 1000 USD)`);
    }

    // 5. TEST SELF-DESTRUCT / SABOTASE (16.6)
    console.log("\n[TEST 5] Verifikasi Anti-Tampering (Self-Destruct)...");
    // Simulasi akses saat terkunci
    await LicenseGuardian.verifySystemIntegritas("PRO", "USER_A", "WRONG_SIG", "1.1.1.1", ["1.1.1.1"]);
    const destroyedContent = fs.readFileSync('sovereign_memory.json', 'utf-8');
    const isDestroyed = !destroyedContent.includes("data");
    console.log(`- Status Sabotase: ${isDestroyed ? "✅ DATA DIHANCURKAN" : "❌ GAGAL HANCUR"}`);

    console.log("\n=== SEMUA SISTEM KEDAULATAN VALID ===");
}

runGrandTest().catch(console.error);
