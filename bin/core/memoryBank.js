const fs = require('fs');
const path = require('path');

// Simpan memori dalam file JSON sederhana (Database Lokal)
const MEMORY_FILE = path.join(__dirname, 'aries_memory.json');

class MemoryBank {
    constructor() {
        if (!fs.existsSync(MEMORY_FILE)) {
            fs.writeFileSync(MEMORY_FILE, JSON.stringify({}));
        }
        console.log("[MEMORY]    💾 Knowledge Base: MOUNTED");
    }

    /**
     * Mengambil contekan (Context) berdasarkan topik
     */
    recall(topic) {
        const db = JSON.parse(fs.readFileSync(MEMORY_FILE));
        // Cari memori yang cocok (Simple Keyword Matching)
        // Nanti di Cloud ini diganti Vector DB canggih
        const memory = db[topic.toLowerCase()];
        if (memory) {
            console.log(`[MEMORY]    💡 Recall Success: Found data for '${topic}'`);
            return memory;
        }
        return null;
    }

    /**
     * Menyimpan pelajaran baru (Self-Learning)
     */
    learn(topic, insight) {
        const db = JSON.parse(fs.readFileSync(MEMORY_FILE));
        db[topic.toLowerCase()] = insight;
        fs.writeFileSync(MEMORY_FILE, JSON.stringify(db, null, 2));
        console.log(`[MEMORY]    📝 Learned new topic: '${topic}'`);
    }
}

module.exports = new MemoryBank();
