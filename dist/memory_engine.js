"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveMemoryToLocal = void 0;
const fs_1 = __importDefault(require("fs"));
const MEMORY_PATH = '/sdcard/Documents/Memori/brain_layers.json';
// Fungsi Encode/Decode sederhana untuk keamanan memori
const encodeMemory = (data) => Buffer.from(JSON.stringify(data)).toString('base64');
const decodeMemory = (data) => JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));
const saveMemoryToLocal = (memories) => {
    try {
        const encoded = encodeMemory(memories);
        fs_1.default.writeFileSync(MEMORY_PATH, encoded);
        console.log(`[${new Date().toLocaleTimeString()}] Memory Synced to Local Storage (Decoded)`);
    }
    catch (err) {
        console.error("Gagal menyimpan ke SDCard:", err);
    }
};
exports.saveMemoryToLocal = saveMemoryToLocal;
// Interval 10 Menit Sesi Aktif
setInterval(() => {
    console.log("Auto-saving active session memory...");
    // Logic: Ambil memori dari database dan simpan
}, 10 * 60 * 1000);
// Interval 12 Jam Sesi Offline
setInterval(() => {
    console.log("Deep sync offline memory...");
}, 12 * 24 * 60 * 60 * 1000);
