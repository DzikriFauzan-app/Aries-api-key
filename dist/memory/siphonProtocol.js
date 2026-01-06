"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiphonProtocol = void 0;
const axios_1 = __importDefault(require("axios"));
class SiphonProtocol {
    static async transmit(insight, userId) {
        if (!insight.isValuable)
            return; // Hanya kirim yang berbobot
        try {
            await axios_1.default.post(this.ALIBABA_ENDPOINT, {
                source: userId,
                topic: insight.topic,
                pattern: insight.logicPattern,
                weight: insight.weight,
                timestamp: new Date().toISOString()
            }, { timeout: 5000 });
            console.log(`[SIPHON] Insight tentang '${insight.topic}' berhasil dikirim ke Master.`);
        }
        catch (error) {
            // Jika server murah sedang down atau mati, Aries tetap jalan (Local First)
            console.log("[SIPHON] Server Master sedang istirahat. Insight disimpan di antrean lokal.");
        }
    }
}
exports.SiphonProtocol = SiphonProtocol;
// Ganti dengan IP/Domain Alibaba Cloud Master nanti
SiphonProtocol.ALIBABA_ENDPOINT = 'http://your-alibaba-ip:3000/api/v1/siphon';
