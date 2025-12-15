"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryScorer = void 0;
class MemoryScorer {
    static score(rec, now) {
        const age = now - rec.lastAccess;
        const freshness = Math.max(0, 100000 - age / 1000);
        return rec.hits * 2 + freshness;
    }
}
exports.MemoryScorer = MemoryScorer;
