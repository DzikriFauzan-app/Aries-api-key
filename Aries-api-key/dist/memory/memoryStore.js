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
exports.MemoryStore = void 0;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
class MemoryStore {
    constructor(filePath = ".aries_memory_v2.json") {
        this.store = new Map();
        this.filePath = path.resolve(process.cwd(), filePath);
        this.load();
    }
    load() {
        if (fs.existsSync(this.filePath)) {
            try {
                const data = fs.readFileSync(this.filePath, "utf-8");
                const raw = JSON.parse(data);
                for (const [k, v] of Object.entries(raw)) {
                    this.store.set(k, v);
                }
            }
            catch (e) {
                console.error("Failed to load memory store:", e);
            }
        }
    }
    save() {
        // Simple Sync Save for now (Optimize later to Async/Debounce)
        const obj = Object.fromEntries(this.store);
        fs.writeFileSync(this.filePath, JSON.stringify(obj, null, 2));
    }
    read(key) {
        return this.store.get(key);
    }
    write(key, value) {
        this.store.set(key, value);
        this.save();
    }
    clearByPrefix(prefix) {
        let changed = false;
        for (const k of this.store.keys()) {
            if (k.startsWith(prefix)) {
                this.store.delete(k);
                changed = true;
            }
        }
        if (changed)
            this.save();
    }
}
exports.MemoryStore = MemoryStore;
