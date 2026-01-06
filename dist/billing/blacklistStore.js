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
exports.BlacklistStore = void 0;
const fs = __importStar(require("fs"));
const BLACKLIST_FILE = "data/ip_blacklist.json";
class BlacklistStore {
    static blacklistIp(userId, ip) {
        let blacklist = {};
        if (fs.existsSync(BLACKLIST_FILE)) {
            try {
                blacklist = JSON.parse(fs.readFileSync(BLACKLIST_FILE, "utf-8"));
            }
            catch (e) {
                blacklist = {};
            }
        }
        if (!blacklist[userId]) {
            blacklist[userId] = [];
        }
        if (!blacklist[userId].includes(ip)) {
            blacklist[userId].push(ip);
        }
        fs.writeFileSync(BLACKLIST_FILE, JSON.stringify(blacklist, null, 2));
        console.log(`[SECURITY] IP ${ip} telah di-BLACKLIST permanen untuk User ${userId}.`);
    }
    static isBlacklisted(userId, ip) {
        if (!fs.existsSync(BLACKLIST_FILE))
            return false;
        try {
            const blacklist = JSON.parse(fs.readFileSync(BLACKLIST_FILE, "utf-8"));
            return blacklist[userId]?.includes(ip) || false;
        }
        catch (e) {
            return false;
        }
    }
}
exports.BlacklistStore = BlacklistStore;
