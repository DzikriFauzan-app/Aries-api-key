"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryTransformer = void 0;
class MemoryTransformer {
    // Simulasi Enkripsi: Base64
    // Di masa depan: AES-256
    static encrypt(content) {
        return Buffer.from(content).toString('base64');
    }
    static decrypt(content) {
        return Buffer.from(content, 'base64').toString('utf-8');
    }
    // Simulasi Kompresi: Hapus whitespace berlebih & deduplikasi kata
    static compress(content) {
        return content.replace(/\s+/g, ' ').trim();
    }
}
exports.MemoryTransformer = MemoryTransformer;
