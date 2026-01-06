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
exports.IpActivator = void 0;
const fs = __importStar(require("fs"));
const deviceVerifier_1 = require("./deviceVerifier");
const planContract_1 = require("./planContract");
const DB_FILE = "data/registered_ips.json";
function loadDb() {
    if (!fs.existsSync(DB_FILE))
        return {};
    try {
        return JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    }
    catch (e) {
        return {};
    }
}
function saveDb(db) {
    if (!fs.existsSync("data"))
        fs.mkdirSync("data");
    fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}
class IpActivator {
    static commitIp(userId, plan, ip, otpCodes) {
        // 1. Validasi OTP (Step 19.6)
        const verified = deviceVerifier_1.DeviceVerifier.verify(userId, ip, otpCodes);
        if (!verified) {
            return { ok: false, reason: "OTP_VERIFICATION_FAILED_OR_EXPIRED" };
        }
        const db = loadDb();
        const limit = (0, planContract_1.getPlanLimit)(plan);
        db[userId] = db[userId] || [];
        // 2. Cek apakah IP sudah ada (Avoid Duplicate)
        const alreadyExists = db[userId].some((entry) => entry.ip === ip);
        if (alreadyExists)
            return { ok: true };
        // 3. HARD SLOT CHECK (Step 15.5 - 18.3)
        if (db[userId].length >= limit.maxIpSlots) {
            return { ok: false, reason: "IP_SLOT_LIMIT_REACHED" };
        }
        // 4. FINAL COMMIT
        db[userId].push({
            ip,
            activatedAt: Date.now(),
            plan
        });
        saveDb(db);
        return { ok: true };
    }
}
exports.IpActivator = IpActivator;
