import { PardonService } from "./src/memory/pardonService";
import { LicenseGuardian } from "./src/memory/licenseGuardian";
import * as fs from "fs";

async function runPardonTest() {
    console.log("=== PARDON SYSTEM TEST ===");
    
    // 1. Generate Token oleh Manager
    const token = PardonService.generate("CORP_A", "10.0.0.51", 5);
    console.log(`- Token Generated: ${token.substring(0, 20)}...`);

    // 2. Apply Pardon
    const result = LicenseGuardian.applyPardon(token);
    console.log(`- Apply Result: ${JSON.stringify(result)}`);

    // 3. Verifikasi Database IP
    const db = JSON.parse(fs.readFileSync("data/registered_ips.json", "utf-8"));
    const isSuccess = db["CORP_A"].includes("10.0.0.51");
    console.log(`- IP Registered via Pardon: ${isSuccess ? "✅ SUCCESS" : "❌ FAILED"}`);

    // 4. Test Token Re-use (Should fail)
    const secondAttempt = LicenseGuardian.applyPardon(token);
    console.log(`- Re-use Attempt: ${secondAttempt.allowed ? "❌ FAILED (Should be blocked)" : "✅ BLOCKED (One-time use)"}`);
}

runPardonTest();
