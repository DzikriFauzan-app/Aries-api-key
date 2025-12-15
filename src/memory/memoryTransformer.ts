import { MemoryRecord } from "./memoryRecord";

export class MemoryTransformer {
  // Simulasi Enkripsi: Base64
  // Di masa depan: AES-256
  static encrypt(content: string): string {
    return Buffer.from(content).toString('base64');
  }

  static decrypt(content: string): string {
    return Buffer.from(content, 'base64').toString('utf-8');
  }

  // Simulasi Kompresi: Hapus whitespace berlebih & deduplikasi kata
  static compress(content: string): string {
    return content.replace(/\s+/g, ' ').trim();
  }
}
