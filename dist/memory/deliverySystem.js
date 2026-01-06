"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliverySystem = void 0;
const crypto = __importStar(require("crypto"));
class DeliverySystem {
    static generateSecureLink(userId, allowedIp) {
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
    static validateDownloadAccess(requestIp, allowedIp, managerIp) {
        console.log(`[SERVER] Mendeteksi permintaan download dari IP: ${requestIp}`);
        if (requestIp === allowedIp || requestIp === managerIp) {
            console.log("[SUCCESS] IP Terverifikasi. Akses Download Dibuka.");
            return true;
        }
        else {
            console.log("[LOCKED] IP Tidak Dikenal. File tetap terenkripsi dan tidak bisa diakses.");
            return false;
        }
    }
}
exports.DeliverySystem = DeliverySystem;
