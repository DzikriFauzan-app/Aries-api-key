import { LicenseGuardian } from "./src/memory/licenseGuardian";
import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

async function runTest() {
    const dbPath = path.join(process.cwd(), "data", "registered_ips.json");
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
    if (fs.existsSync(".sys_lock")) fs.unlinkSync(".sys_lock");

    const user = "CORP_X";
    const plan = "FREE"; // Hanya 1 slot

    console.log("=== KASUS 1: IP DIAMPUNI MANAGER ===");
    // Manager memberikan Pardon sebelum user login
    console.log("- Manager executing pardon for 8.8.8.8...");
    execSync(`export ARIES_MANAGER_SECRET="master" && export ARIES_MANAGER_HASH="$(echo -n master | sha256sum | cut -d' ' -f1)" && npx ts-node src/manager/managerCLI.ts pardon ${user} 8.8.8.8`);

    // User login dengan IP yang sudah diampuni
    const access1 = await LicenseGuardian.validateCorporateAccess(plan, user, "8.8.8.8");
    console.log(`- Access for 8.8.8.8 (Pardoned): ${access1 ? "✅ GRANTED" : "❌ DENIED"}`);

    console.log("\n=== KASUS 2: IP DIBLOKIR (SLOT FULL) ===");
    // User mencoba masuk dengan IP lain (Slot FREE cuma 1, dan sudah terpakai oleh 8.8.8.8)
    const access2 = await LicenseGuardian.validateCorporateAccess(plan, user, "1.1.1.1");
    console.log(`- Access for 1.1.1.1 (Unauthorized): ${access2 ? "✅ GRANTED" : "❌ DENIED"}`);
    
    const isLocked = fs.existsSync(".sys_lock");
    console.log(`- System Lockdown Triggered: ${isLocked ? "✅ YES" : "❌ NO"}`);
}

runTest();
