"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
class MemoryStore {
    constructor(backend) {
        this.backend = backend;
    }
    read(key) {
        return this.backend.read(key);
    }
    write(rec) {
        this.backend.write(rec);
    }
    delete(key) {
        this.backend.delete(key);
    }
    snapshot() {
        return this.backend.snapshot();
    }
    replace(all) {
        this.backend.replace(all);
    }
}
exports.MemoryStore = MemoryStore;
