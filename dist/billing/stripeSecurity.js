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
exports.StripeSecurity = void 0;
const crypto = __importStar(require("crypto"));
class StripeSecurity {
    static verify(payload, sig, secret) {
        try {
            const parts = sig.split(',');
            const timestamp = parts.find(p => p.startsWith('t='))?.split('=')[1];
            const signature = parts.find(p => p.startsWith('v1='))?.split('=')[1];
            if (!timestamp || !signature)
                return false;
            const signedPayload = `${timestamp}.${payload}`;
            const expectedSignature = crypto
                .createHmac("sha256", secret)
                .update(signedPayload)
                .digest("hex");
            // PROTEKSI PANJANG: Jika beda, otomatis palsu.
            if (signature.length !== expectedSignature.length) {
                return false;
            }
            // PROTEKSI TIMING: Bandingkan isi buffer dengan aman.
            const isMatch = crypto.timingSafeEqual(Buffer.from(signature, "hex"), Buffer.from(expectedSignature, "hex"));
            const isExpired = Math.abs(Date.now() / 1000 - parseInt(timestamp)) > 300;
            return isMatch && !isExpired;
        }
        catch (e) {
            return false;
        }
    }
}
exports.StripeSecurity = StripeSecurity;
