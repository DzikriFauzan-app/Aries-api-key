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
exports.MemoryIndexer = void 0;
const fs = __importStar(require("fs"));
const INDEX_PATH = '/data/data/com.termux/files/home/Aries-api-key/aries_neural_index.json';
const BACKUP_PATH = '/sdcard/Buku saya/Memori Aries/backup_engram.json';
class MemoryIndexer {
    /**
     * Membangun index dari kata kunci untuk pencarian instan.
     */
    static async indexEngram(input, id) {
        try {
            let index = {};
            if (fs.existsSync(INDEX_PATH)) {
                index = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf-8'));
            }
            // Ekstrak kata kunci (hilangkan kata umum)
            const keywords = input.toLowerCase()
                .replace(/[^\w\s]/gi, '')
                .split(' ')
                .filter(word => word.length > 3);
            keywords.forEach(word => {
                if (!index[word])
                    index[word] = [];
                if (!index[word].includes(id))
                    index[word].push(id);
            });
            fs.writeFileSync(INDEX_PATH, JSON.stringify(index, null, 2));
            console.log(`🎯 [INDEXER] Keyword Map Updated: ${keywords.length} tokens.`);
            // Trigger Backup Otomatis ke SD Card jika folder ada
            this.syncToSDCard();
        }
        catch (e) {
            console.error("⚠️ [INDEXER_ERR]", e);
        }
    }
    static syncToSDCard() {
        const source = '/data/data/com.termux/files/home/Aries-api-key/aries_neural_memory.json';
        if (fs.existsSync('/sdcard/Buku saya/Memori Aries')) {
            try {
                const data = fs.readFileSync(source, 'utf-8');
                fs.writeFileSync(BACKUP_PATH, data);
                console.log("💾 [ARCHIVE] Deep-Sync to SD Card Success.");
            }
            catch (e) {
                console.log("⚠️ [ARCHIVE] SD Card Permission needed.");
            }
        }
    }
}
exports.MemoryIndexer = MemoryIndexer;
