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
exports.ImmutableAuditLog = void 0;
const fs = __importStar(require("fs"));
const crypto = __importStar(require("crypto"));
const path = __importStar(require("path"));
class ImmutableAuditLog {
    static append(event, data) {
        const prevHash = this.getLastHash();
        const payload = {
            timestamp: Date.now(),
            event,
            data,
            prevHash
        };
        const hash = crypto
            .createHash("sha256")
            .update(JSON.stringify(payload))
            .digest("hex");
        const entry = { ...payload, hash };
        fs.appendFileSync(this.LOG_FILE, JSON.stringify(entry) + "\n", { encoding: "utf-8" });
    }
    static getLastHash() {
        if (!fs.existsSync(this.LOG_FILE))
            return "GENESIS";
        const content = fs.readFileSync(this.LOG_FILE, "utf-8").trim();
        if (!content)
            return "GENESIS";
        const lines = content.split("\n");
        try {
            const last = JSON.parse(lines[lines.length - 1]);
            return last.hash || "GENESIS";
        }
        catch (e) {
            return "GENESIS";
        }
    }
    static verifyChain() {
        if (!fs.existsSync(this.LOG_FILE))
            return true;
        const content = fs.readFileSync(this.LOG_FILE, "utf-8").trim();
        if (!content)
            return true;
        const lines = content.split("\n");
        let prevHash = "GENESIS";
        for (const line of lines) {
            try {
                const entry = JSON.parse(line);
                const recalculated = crypto
                    .createHash("sha256")
                    .update(JSON.stringify({
                    timestamp: entry.timestamp,
                    event: entry.event,
                    data: entry.data,
                    prevHash
                }))
                    .digest("hex");
                if (recalculated !== entry.hash)
                    return false;
                prevHash = entry.hash;
            }
            catch (e) {
                return false;
            }
        }
        return true;
    }
}
exports.ImmutableAuditLog = ImmutableAuditLog;
ImmutableAuditLog.LOG_FILE = path.join(process.cwd(), "audit_worm.log");
