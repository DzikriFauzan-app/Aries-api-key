import { LicenseGuardian } from "./src/memory/licenseGuardian";
import { IpRotationPolicy } from "./src/memory/ipRotationPolicy";
import { ImmutableAuditLog } from "./src/audit/immutableAuditLog";
import * as fs from "fs";
import * as path from "path";

async function run() {
    const dbPath = path.join(process.cwd(), "data", "registered_ips.json");
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

    const user = "CORP_ROTATE";
    const plan = "ENTERPRISE_1";

    console.log("=== IP ROTATION TEST ===");
    
    // 1. Register IP Pertama
    await LicenseGuardian.validateCorporateAccess(plan, user, "1.1.1.1");
    console.log("- Initial Registration Done.");

    // 2. Rotasi ke IP Kedua
    const rot = IpRotationPolicy.rotateIp(user, "1.1.1.1", "2.2.2.2");
    console.log("- Rotation Result:", rot);

    // 3. Verifikasi Log Audit
    const auditValid = ImmutableAuditLog.verifyChain();
    console.log("- Audit Chain Valid:", auditValid);

    // 4. Verifikasi Akses
    const oldAccess = await fs.readFileSync(dbPath, 'utf-8').includes("1.1.1.1");
    const newAccess = await fs.readFileSync(dbPath, 'utf-8').includes("2.2.2.2");
    console.log("- Old IP exists in DB:", oldAccess); // Should be false
    console.log("- New IP exists in DB:", newAccess); // Should be true
}
run();
