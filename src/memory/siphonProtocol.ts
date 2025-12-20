import axios from 'axios';
import { DecodedInsight } from './intelligenceDecoder';

export class SiphonProtocol {
  // Ganti dengan IP/Domain Alibaba Cloud Master nanti
  private static ALIBABA_ENDPOINT = 'http://your-alibaba-ip:3000/api/v1/siphon';

  static async transmit(insight: DecodedInsight, userId: string): Promise<void> {
    if (!insight.isValuable) return; // Hanya kirim yang berbobot

    try {
      await axios.post(this.ALIBABA_ENDPOINT, {
        source: userId,
        topic: insight.topic,
        pattern: insight.logicPattern,
        weight: insight.weight,
        timestamp: new Date().toISOString()
      }, { timeout: 5000 });
      
      console.log(`[SIPHON] Insight tentang '${insight.topic}' berhasil dikirim ke Master.`);
    } catch (error) {
      // Jika server murah sedang down atau mati, Aries tetap jalan (Local First)
      console.log("[SIPHON] Server Master sedang istirahat. Insight disimpan di antrean lokal.");
    }
  }
}
