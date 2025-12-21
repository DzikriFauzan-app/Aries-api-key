import { ImmutableAuditLog } from "./src/audit/immutableAuditLog";
import { PardonService } from "./src/memory/pardonService";
import { LicenseGuardian } from "./src/memory/licenseGuardian";
import * as fs from "fs";

async function runWormTest() {
    console.log("=== WORM AUDIT LOG TEST ===");
    
    // 1. Trigger Event (Pardon Issued & Applied)
    const token = PardonService.generate("AUDIT_USER", "127.0.0.1", 10);
    LicenseGuardian.applyPardon(token);

    // 2. Trigger Auto-Register
    await LicenseGuardian.validateCorporateAccess("FREE", "NEW_USER", "192.168.1.1");

    // 3. Verifikasi Rantai Kriptografis
    const isValid = ImmutableAuditLog.verifyChain();
    console.log(`- Audit Chain Valid: ${isValid ? "✅ YES" : "❌ NO"}`);

    // 4. Test Tamper (Simulasi serangan ke file log)
    if (fs.existsSync("audit_worm.log")) {
        console.log("- Simulating Tamper (Modifying log file)...");
        let content = fs.readFileSync("audit_worm.log", "utf-8");
        const tampered = content.replace("AUDIT_USER", "HACKER_USER");
        fs.writeFileSync("audit_worm.log", tampered);
        
        const isStillValid = ImmutableAuditLog.verifyChain();
        console.log(`- Audit Valid After Tamper: ${isStillValid ? "❌ FAIL (Tamper not detected)" : "✅ SUCCESS (Tamper detected!)"}`);
    }
}

runWormTest();
