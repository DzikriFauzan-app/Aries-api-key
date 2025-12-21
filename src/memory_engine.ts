import fs from 'fs';
import path from 'path';

const MEMORY_PATH = '/sdcard/Documents/Memori/brain_layers.json';

// Fungsi Encode/Decode sederhana untuk keamanan memori
const encodeMemory = (data: any) => Buffer.from(JSON.stringify(data)).toString('base64');
const decodeMemory = (data: string) => JSON.parse(Buffer.from(data, 'base64').toString('utf-8'));

export const saveMemoryToLocal = (memories: any[]) => {
    try {
        const encoded = encodeMemory(memories);
        fs.writeFileSync(MEMORY_PATH, encoded);
        console.log(`[${new Date().toLocaleTimeString()}] Memory Synced to Local Storage (Decoded)`);
    } catch (err) {
        console.error("Gagal menyimpan ke SDCard:", err);
    }
};

// Interval 10 Menit Sesi Aktif
setInterval(() => {
    console.log("Auto-saving active session memory...");
    // Logic: Ambil memori dari database dan simpan
}, 10 * 60 * 1000);

// Interval 12 Jam Sesi Offline
setInterval(() => {
    console.log("Deep sync offline memory...");
}, 12 * 24 * 60 * 60 * 1000);
