"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryStore = void 0;
class MemoryStore {
    constructor(backend) {
        this.backend = backend;
        this.records = [];
    }
    write(record) {
        this.records.push(Object.freeze(record));
        this.backend?.write(record);
    }
    read(key) {
        return this.backend?.read(key);
    }
    readByAgent(agent) {
        return this.records.filter(r => r.agent === agent);
    }
    all() {
        return this.records;
    }
}
exports.MemoryStore = MemoryStore;
