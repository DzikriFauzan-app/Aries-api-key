import * as crypto from 'crypto';

export class DeliverySystem {
  static generateSecureLink(userId: string, allowedIp: string) {
    const tempUsername = `RECOVERY_${userId}_${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const tempPassword = crypto.randomBytes(12).toString('base64');
    
    console.log(`\n[ARIES-MAIL] Membuat Email Custom untuk ${userId}...`);
    console.log(`[CREDENTIALS] Username: ${tempUsername}`);
    console.log(`[CREDENTIALS] Password: ${tempPassword}`);
    
    return {
      username: tempUsername,
      password: tempPassword,
      allowedIp: allowedIp,
      link: `https://vault.aries.master/download/${crypto.randomBytes(16).toString('hex')}`
    };
  }

  static validateDownloadAccess(requestIp: string, allowedIp: string, managerIp: string): boolean {
    console.log(`[SERVER] Mendeteksi permintaan download dari IP: ${requestIp}`);
    
    if (requestIp === allowedIp || requestIp === managerIp) {
      console.log("[SUCCESS] IP Terverifikasi. Akses Download Dibuka.");
      return true;
    } else {
      console.log("[LOCKED] IP Tidak Dikenal. File tetap terenkripsi dan tidak bisa diakses.");
      return false;
    }
  }
}
