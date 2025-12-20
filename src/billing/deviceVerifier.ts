import { getPlanLimit } from "./planContract";
import { OtpLedger } from "./otpLedger";
import { BlacklistStore } from "./blacklistStore";

export class DeviceVerifier {
  static initiateIpVerification(userId: string, plan: string, newIp: string) {
    // Cek Blacklist dulu sesuai Step 19.5
    if (BlacklistStore.isBlacklisted(userId, newIp)) {
      console.log(`[DENIED] IP ${newIp} dalam BLACKLIST.`);
      return null;
    }

    const limit = getPlanLimit(plan);
    const codes = Array.from({ length: 5 }, () => 
      Math.floor(1000 + Math.random() * 9000).toString()
    );

    // Daftarkan ke Ledger dengan Hash
    OtpLedger.create(userId, newIp, limit.verifierRole, codes);

    console.log(`[AUTH] IP ${newIp} butuh verifikasi oleh ${limit.verifierRole}`);
    console.log(`[AUTH] OTP dikirim ke perangkat otoritas (Hidden)`);
    
    return codes; // Hanya untuk testing, produksi dikirim via jalur privat
  }

  static verify(userId: string, ip: string, inputCodes: string[]): boolean {
    return OtpLedger.verify(userId, ip, inputCodes);
  }

  static processManagerDecision(userId: string, ip: string, approved: boolean) {
    if (!approved) {
      BlacklistStore.blacklistIp(userId, ip);
      return "REJECTED_AND_BLACKLISTED";
    }
    return "APPROVED";
  }
}
