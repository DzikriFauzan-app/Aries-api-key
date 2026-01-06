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
exports.StripeAdapter = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const stripeSecurity_1 = require("./stripeSecurity");
const DB_PATH = path.join(process.cwd(), "data/billing.json");
class StripeAdapter {
    static handleSecureEvent(rawBody, sig, secret) {
        // 1. Verifikasi Keaslian
        const isValid = stripeSecurity_1.StripeSecurity.verify(rawBody, sig, secret);
        if (!isValid) {
            console.error("🚨 SECURITY ALERT: INVALID STRIPE SIGNATURE DETECTED!");
            throw new Error("UNAUTHORIZED_WEBHOOK_SOURCE");
        }
        // 2. Jika valid, proses data JSON-nya
        const event = JSON.parse(rawBody);
        const db = JSON.parse(fs.readFileSync(DB_PATH, "utf-8") || "{}");
        const metadata = event.data?.object?.metadata;
        const userId = metadata?.userId;
        if (!userId)
            return;
        if (event.type === "invoice.paid") {
            db[userId] = {
                ...db[userId],
                status: "ACTIVE",
                expireAt: Date.now() + 30 * 24 * 3600 * 1000
            };
            console.log(`✅ SECURE_PAYMENT_VERIFIED: User ${userId} updated.`);
        }
        fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    }
}
exports.StripeAdapter = StripeAdapter;
