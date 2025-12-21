import { LicenseGuardian } from './src/memory/licenseGuardian';
import * as fs from 'fs';

async function runTest() {
  console.log("--- SIMULASI ENTERPRISE 1 (Limit 50 Slot) ---");
  const userId = "CORP_ACME_001";
  
  // Simulasi mendaftarkan 50 IP pertama
  for (let i = 1; i <= 50; i++) {
    const ip = `192.168.1.${i}`;
    await LicenseGuardian.validateCorporateAccess("ENTERPRISE_1", userId, ip);
  }
  
  // Tes IP ke-51 (Harus di-Ban)
  const intruderIp = "192.168.1.51";
  const result = await LicenseGuardian.validateCorporateAccess("ENTERPRISE_1", userId, intruderIp);
  
  console.log(`IP Ke-51 Result: ${result.allowed ? "LOLOS (FAILED)" : "DIBLOKIR (SUCCESS)"}`);
  console.log(`Pesan Sistem: ${result.message}`);

  // Bersihkan file test
  if (fs.existsSync('registered_ips.json')) fs.unlinkSync('registered_ips.json');
}
runTest();
