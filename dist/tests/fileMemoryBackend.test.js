"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fileMemoryBackend_1 = require("../memory/fileMemoryBackend");
function assert(cond, msg) {
    if (!cond)
        throw new Error(msg);
}
(() => {
    const backend = new fileMemoryBackend_1.FileMemoryBackend(".test_memory.json");
    backend.write({
        key: "a",
        value: "1",
        ts: 1,
        score: 1,
        hits: 0,
        lastAccess: 1
    });
    backend.write({
        key: "b",
        value: "2",
        ts: 2,
        score: 1,
        hits: 0,
        lastAccess: 2
    });
    assert(backend.read("a")?.value === "1", "READ a FAILED");
    assert(backend.read("b")?.value === "2", "READ b FAILED");
    console.log("FILE MEMORY BACKEND TEST PASSED");
})();
