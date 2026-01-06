"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryRetention = void 0;
class MemoryRetention {
    constructor(minScore) {
        this.minScore = minScore;
    }
    retain(records) {
        return records.filter(r => r.score >= this.minScore);
    }
}
exports.MemoryRetention = MemoryRetention;
