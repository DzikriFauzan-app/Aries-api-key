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
exports.DeviceVerifier = void 0;
const crypto = __importStar(require("crypto"));
const otpLedger_1 = require("./otpLedger");
const planContract_1 = require("./planContract");
const blacklistStore_1 = require("./blacklistStore");
function hashCodes(codes) {
    return crypto.createHash("sha256").update(codes.join("-")).digest("hex");
}
class DeviceVerifier {
    static initiateIpVerification(userId, plan, ip) {
        if (blacklistStore_1.BlacklistStore.isBlacklisted(userId, ip))
            return null;
        const limit = (0, planContract_1.getPlanLimit)(plan);
        const codes = Array.from({ length: 5 }, () => Math.floor(1000 + Math.random() * 9000).toString());
        const key = `${userId}:${ip}`;
        otpLedger_1.OtpLedger.put(key, {
            userId,
            ip,
            codesHash: hashCodes(codes),
            expiresAt: Date.now() + 120000,
            attempts: 0
        });
        console.log(`[AUTH] Verifikasi dipicu untuk ${userId} @ ${ip}. Role: ${limit.verifierRole}`);
        return codes;
    }
    static verify(userId, ip, inputCodes) {
        const key = `${userId}:${ip}`;
        const entry = otpLedger_1.OtpLedger.get(key);
        if (!entry)
            return false;
        const ok = entry.codesHash === hashCodes(inputCodes);
        if (!ok) {
            otpLedger_1.OtpLedger.fail(key);
            return false;
        }
        otpLedger_1.OtpLedger.consume(key); // SUCCESS -> Anti-Replay
        return true;
    }
}
exports.DeviceVerifier = DeviceVerifier;
