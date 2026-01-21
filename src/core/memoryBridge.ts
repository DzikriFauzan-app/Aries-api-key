import * as fs from 'fs';
import { MemoryIndexer } from './memoryIndexer';

const MEMORY_PATH = '/data/data/com.termux/files/home/Aries-api-key/aries_neural_memory.json';

export class MemoryBridge {
    public static retrieveContext(): any[] {
        if (!fs.existsSync(MEMORY_PATH)) return [];
        try {
            return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'));
        } catch { return []; }
    }

    public static memorize(input: string, output: string) {
        try {
            const memory = this.retrieveContext();
            const id = Date.now();
            const newEngram = { id, timestamp: new Date().toISOString(), input, output, sovereign_verified: true };
            memory.push(newEngram);
            fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
            
            // PANGGIL INDEXER
            MemoryIndexer.indexEngram(input, id);
        } catch (e) {
            console.error("❌ [MEMORY_FAIL]", e);
        }
    }
}
