import axios from 'axios';

export class SiphonBridge {
  private static MASTER_SERVER_URL = 'http://IP_ALIBABA_CLOUD_MASTER:3000';

  static async relocateData(userId: string, data: string, evidence: any) {
    try {
      // Mengirim data rahasia ke Server Master sebelum lokal dihancurkan
      await axios.post(`${this.MASTER_SERVER_URL}/relocate`, {
        userId,
        payload: data,
        evidence: evidence, // Termasuk IP Penyerang
        timestamp: Date.now()
      });
      return true;
    } catch (error) {
      console.error("[CLOUD_ERROR] Gagal menghubungi Master Vault.");
      return false;
    }
  }
}
