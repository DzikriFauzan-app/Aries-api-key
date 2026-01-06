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
exports.LocalQuotaManager = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class LocalQuotaManager {
    static async checkAndIncrement(limit) {
        if (limit === -1)
            return { allowed: true };
        const today = new Date().toISOString().split('T')[0];
        let data = { count: 0, lastDate: today };
        if (fs.existsSync(this.FILE_PATH)) {
            data = JSON.parse(fs.readFileSync(this.FILE_PATH, 'utf-8'));
        }
        // Reset Otomatis jika sudah ganti hari (00:00)
        if (data.lastDate !== today) {
            data = { count: 0, lastDate: today };
        }
        if (data.count >= limit)
            return { allowed: false };
        data.count++;
        fs.writeFileSync(this.FILE_PATH, JSON.stringify(data));
        return { allowed: true };
    }
}
exports.LocalQuotaManager = LocalQuotaManager;
LocalQuotaManager.FILE_PATH = path.join(process.cwd(), 'quota_tracker.json');
