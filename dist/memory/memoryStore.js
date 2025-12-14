"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
class MemoryStore {
    constructor(backend) {
        this.backend = backend;
    }
    write(key, value) {
        const rec = {
            key,
            value,
            ts: Date.now()
        };
        this.backend.write(rec);
    }
    read(key) {
        return this.backend.read(key);
    }
    snapshot() {
        return this.backend.snapshot();
    }
}
exports.MemoryStore = MemoryStore;
