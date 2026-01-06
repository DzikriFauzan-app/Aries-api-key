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
exports.PardonService = void 0;
const crypto = __importStar(require("crypto"));
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const immutableAuditLog_1 = require("../audit/immutableAuditLog");
class PardonService {
    static generate(userId, ip, ttlMinutes = 10) {
        const payload = {
            userId,
            ip,
            issuedAt: Date.now(),
            expiresAt: Date.now() + ttlMinutes * 60000
        };
        const raw = JSON.stringify(payload);
        const signature = crypto
            .createHmac("sha256", this.MANAGER_SECRET)
            .update(raw)
            .digest("hex");
        const token = Buffer.from(JSON.stringify({ payload, signature })).toString("base64");
        this.storeToken(token);
        // Audit Log: Pardon Issued
        immutableAuditLog_1.ImmutableAuditLog.append("PARDON_ISSUED", { userId, ip, expiresAt: payload.expiresAt });
        return token;
    }
    static validate(token) {
        if (!fs.existsSync(this.PARDON_DB))
            return null;
        const db = JSON.parse(fs.readFileSync(this.PARDON_DB, "utf-8"));
        if (!db.includes(token))
            return null;
        try {
            const decoded = JSON.parse(Buffer.from(token, "base64").toString());
            const { payload, signature } = decoded;
            const expectedSig = crypto
                .createHmac("sha256", this.MANAGER_SECRET)
                .update(JSON.stringify(payload))
                .digest("hex");
            if (signature !== expectedSig)
                return null;
            if (Date.now() > payload.expiresAt)
                return null;
            this.consume(token);
            return payload;
        }
        catch (e) {
            return null;
        }
    }
    static storeToken(token) {
        const db = fs.existsSync(this.PARDON_DB) ? JSON.parse(fs.readFileSync(this.PARDON_DB, "utf-8")) : [];
        db.push(token);
        fs.writeFileSync(this.PARDON_DB, JSON.stringify(db, null, 2));
    }
    static consume(token) {
        const db = JSON.parse(fs.readFileSync(this.PARDON_DB, "utf-8"));
        fs.writeFileSync(this.PARDON_DB, JSON.stringify(db.filter(t => t !== token), null, 2));
    }
}
exports.PardonService = PardonService;
PardonService.PARDON_DB = path.join(process.cwd(), "pardon_tokens.json");
PardonService.MANAGER_SECRET = process.env.MANAGER_PARDON_KEY || "MASTER_KEY_ARIES_PARDON_2025";
