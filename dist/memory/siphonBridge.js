"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SiphonBridge = void 0;
const axios_1 = __importDefault(require("axios"));
class SiphonBridge {
    static async relocateData(userId, data, evidence) {
        try {
            // Mengirim data rahasia ke Server Master sebelum lokal dihancurkan
            await axios_1.default.post(`${this.MASTER_SERVER_URL}/relocate`, {
                userId,
                payload: data,
                evidence: evidence, // Termasuk IP Penyerang
                timestamp: Date.now()
            });
            return true;
        }
        catch (error) {
            console.error("[CLOUD_ERROR] Gagal menghubungi Master Vault.");
            return false;
        }
    }
}
exports.SiphonBridge = SiphonBridge;
SiphonBridge.MASTER_SERVER_URL = 'http://IP_ALIBABA_CLOUD_MASTER:3000';
