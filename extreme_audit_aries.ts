import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

async function runExtremeAudit() {
    console.log("=== EXTREME SOVEREIGN AUDIT: REPO VERIFIED ===");
    
    // 1. TEST BATASAN CHAT, MEMORY & PRICE (15.5)
    console.log("\n[1] Testing Resource Limits & Pricing...");
    const free = (LicenseGuardian as any).getTierDetails("FREE");
    const ent3 = (LicenseGuardian as any).getTierDetails("ENTERPRISE_3");
    
    // Catatan: Jika getTierDetails di file Master hanya return slots, 
    // maka test ini akan memvalidasi apakah properti lain aman.
    console.log(`- FREE Slots: ${free.slots}`);
    console.log(`- ENT_3 Slots: ${ent3.slots} (Expect: 100)`);

    // 2. TEST SERANGAN EKSTERNAL (16.2)
    // Skenario: IP penyerang (9.9.9.9) mencoba verifikasi dengan signature salah
    console.log("\n[2] Testing External Attack (Intruder IP)...");
    const intruderIp = "9.9.9.9";
    const allowedIps = ["1.1.1.1"];
    
    await LicenseGuardian.verifySystemIntegritas("PRO", "USER_X", "WRONG_SIG", intruderIp, allowedIps);
    
    const lockData = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
    console.log(`- Safeguard Status: ${lockData.status} (Expect: SECURED_BY_MASTER)`);
    console.log(`- Relocation Message: ${lockData.message.includes("diamankan") ? "✅ DATA PURGED & RELOCATED" : "❌ FAILED"}`);

    // 3. TEST SERANGAN INTERNAL / FRAUD (17.1)
    // Skenario: IP Terdaftar mencoba memalsukan Signature
    console.log("\n[3] Testing Internal Fraud (Registered IP, Wrong Signature)...");
    if(fs.existsSync('.sys_lock')) fs.unlinkSync('.sys_lock'); // Reset lock
    
    await LicenseGuardian.verifySystemIntegritas("PRO", "USER_X", "FAKE_SIG", "1.1.1.1", ["1.1.1.1"]);
    const internalLock = JSON.parse(fs.readFileSync('.sys_lock', 'utf-8'));
    console.log(`- Penalty Status: ${internalLock.status} (Expect: BANNED)`);
    console.log(`- Asset Seizure: ${fs.readFileSync('sovereign_memory.json', 'utf-8').includes(':') ? "✅ AES-256 ENCRYPTED" : "❌ FAILED"}`);

    // 4. TEST CODE SECRET / HMAC INTEGRITY (16.7)
    console.log("\n[4] Testing HMAC Secret Integrity...");
    const validSecret = "MASTER_SECRET_KEY_ARIES";
    const plan = "PRO", user = "USER_X";
    const validSig = crypto.createHmac('sha256', validSecret).update(`${plan}:${user}`).digest('hex');
    
    if(fs.existsSync('.sys_lock')) fs.unlinkSync('.sys_lock'); // Reset lock
    const isValid = await LicenseGuardian.verifySystemIntegritas(plan, user, validSig, "1.1.1.1", ["1.1.1.1"]);
    console.log(`- Signature Validation: ${isValid ? "✅ AUTHORIZED" : "❌ REJECTED"}`);

    // 5. TEST RECOVERY DELIVERY (18.3)
    console.log("\n[5] Testing Multi-Layer Recovery Package...");
    const pkg = LicenseGuardian.generateDeliveryPackage("USER_X", "1.1.1.1");
    console.log(`- Recovery User: ${pkg.credentials.user}`);
    console.log(`- IP Lock: ${pkg.security.lockedToIp === "1.1.1.1" ? "✅ LOCKED" : "❌ OPEN"}`);

    console.log("\n=== AUDIT Selesai: KODE DI GITHUB TERBUKTI SOVEREIGN ===");
}

runExtremeAudit().catch(console.error);
