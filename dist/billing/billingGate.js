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
exports.BillingGate = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const downgradeEngine_1 = require("./downgradeEngine");
class BillingGate {
    static check(userId) {
        // Jalankan pemeriksaan penurunan paket otomatis
        (0, downgradeEngine_1.enforceDowngrade)(userId);
        if (!fs.existsSync(this.BILLING_DB))
            return { ok: true };
        const db = JSON.parse(fs.readFileSync(this.BILLING_DB, "utf-8"));
        const rec = db[userId];
        if (!rec)
            return { ok: true };
        // Selama status ACTIVE atau dalam masa Grace (PAST_DUE tapi belum expired grace), izinkan lewat.
        // DowngradeEngine sudah mengurus penurunan plan di licenses.json jika grace habis.
        if (rec.status !== "ACTIVE" && rec.status !== "PAST_DUE") {
            return { ok: false, reason: `BILLING_${rec.status}` };
        }
        return { ok: true };
    }
}
exports.BillingGate = BillingGate;
BillingGate.BILLING_DB = path.join(process.cwd(), "data/billing.json");
