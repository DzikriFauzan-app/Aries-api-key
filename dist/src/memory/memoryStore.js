"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
class MemoryStore {
    constructor() {
        this.store = new Map();
    }
    write(key, value) {
        const record = {
            key,
            value,
            timestamp: Date.now()
        };
        this.store.set(key, record);
    }
    read(key) {
        return this.store.get(key) || null;
    }
    clear() {
        this.store.clear();
    }
}
exports.MemoryStore = MemoryStore;
