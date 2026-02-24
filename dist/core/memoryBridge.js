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
exports.MemoryBridge = void 0;
const fs = __importStar(require("fs"));
const memoryIndexer_1 = require("./memoryIndexer");
const MEMORY_PATH = '/data/data/com.termux/files/home/Aries-api-key/aries_neural_memory.json';
class MemoryBridge {
    static retrieveContext() {
        if (!fs.existsSync(MEMORY_PATH))
            return [];
        try {
            return JSON.parse(fs.readFileSync(MEMORY_PATH, 'utf-8'));
        }
        catch {
            return [];
        }
    }
    static memorize(input, output) {
        try {
            const memory = this.retrieveContext();
            const id = Date.now();
            const newEngram = { id, timestamp: new Date().toISOString(), input, output, sovereign_verified: true };
            memory.push(newEngram);
            fs.writeFileSync(MEMORY_PATH, JSON.stringify(memory, null, 2));
            // PANGGIL INDEXER
            memoryIndexer_1.MemoryIndexer.indexEngram(input, id);
        }
        catch (e) {
            console.error("❌ [MEMORY_FAIL]", e);
        }
    }
}
exports.MemoryBridge = MemoryBridge;
