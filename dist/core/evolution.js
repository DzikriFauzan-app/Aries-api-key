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
exports.AriesEvolution = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const child_process_1 = require("child_process");
const util_1 = require("util");
const execAsync = (0, util_1.promisify)(child_process_1.exec);
class AriesEvolution {
    static async assimilateUpgrade() {
        if (!fs.existsSync(this.UPGRADE_PATH)) {
            return { success: false, message: "File upgrade.txt tidak ditemukan." };
        }
        try {
            const rawContent = fs.readFileSync(this.UPGRADE_PATH, 'utf-8');
            // Menghapus karakter \r dan membagi baris
            const lines = rawContent.replace(/\r/g, '').split('\n');
            // Mencari baris yang mengandung #TARGET: di mana saja di baris pertama
            const firstLine = lines[0].trim();
            if (firstLine.includes('#TARGET:')) {
                const targetPath = firstLine.split('#TARGET:')[1].trim();
                const code = lines.slice(1).join('\n');
                const fullDestPath = path.join('/data/data/com.termux/files/home/Aries-api-key/src', targetPath);
                fs.mkdirSync(path.dirname(fullDestPath), { recursive: true });
                fs.writeFileSync(fullDestPath, code);
                await execAsync('cd /data/data/com.termux/files/home/Aries-api-key && npx tsc');
                // Hapus file upgrade setelah sukses
                fs.unlinkSync(this.UPGRADE_PATH);
                return { success: true, message: `Berhasil mengasimilasi ${targetPath}` };
            }
            return { success: false, message: `Format Salah. Terdeteksi: "${firstLine}"` };
        }
        catch (error) {
            return { success: false, message: error.message };
        }
    }
}
exports.AriesEvolution = AriesEvolution;
AriesEvolution.UPGRADE_PATH = '/sdcard/Buku saya/Upgrade system Aries/upgrade.txt';
