"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const memoryRetention_1 = require("../memory/memoryRetention");
(() => {
    const retention = new memoryRetention_1.MemoryRetention(50);
    const records = [
        { key: "a", value: "A", ts: 0, hits: 1, lastAccess: 0, score: 10 },
        { key: "b", value: "B", ts: 0, hits: 10, lastAccess: 0, score: 100 }
    ];
    const kept = retention.retain(records);
    if (kept.length !== 1 || kept[0].key !== "b") {
        throw new Error("MEMORY RETENTION FAILED");
    }
    console.log("MEMORY RETENTION TEST PASSED");
})();
