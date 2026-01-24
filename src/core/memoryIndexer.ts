import * as fs from 'fs';
import * as path from 'path';

const INDEX_PATH = '/data/data/com.termux/files/home/Aries-api-key/aries_neural_index.json';
const BACKUP_PATH = '/sdcard/Buku saya/Memori Aries/backup_engram.json';

export class MemoryIndexer {
    /**
     * Membangun index dari kata kunci untuk pencarian instan.
     */
    public static async indexEngram(input: string, id: number) {
        try {
            let index: Record<string, number[]> = {};
            if (fs.existsSync(INDEX_PATH)) {
                index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
            }

            // Ekstrak kata kunci (hilangkan kata umum)
            const keywords = input.toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .split(' ')
                .filter(word => word.length > 3);

            keywords.forEach(word => {
                if (!index[word]) index[word] = [];
                if (!index[word].includes(id)) index[word].push(id);
            });

            fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
            console.log(`🎯 [INDEXER] Keyword Map Updated: ${keywords.length} tokens.`);
            
            // Trigger Backup Otomatis ke SD Card jika folder ada
            this.syncToSDCard();
        } catch (e) {
            console.error("⚠️ [INDEXER_ERR]", e);
        }
    }

    private static syncToSDCard() {
        const source = '/data/data/com.termux/files/home/Aries-api-key/aries_neural_memory.json';
        if (fs.existsSync('/sdcard/Buku saya/Memori Aries')) {
            try {
                const data = fs.readFileSync(source, 'utf-8');
                fs.writeFileSync(BACKUP_PATH, data);
                console.log("💾 [ARCHIVE] Deep-Sync to SD Card Success.");
            } catch (e) {
                console.log("⚠️ [ARCHIVE] SD Card Permission needed.");
            }
        }
    }
}
