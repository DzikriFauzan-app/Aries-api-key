"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultMemory = createDefaultMemory;
const memoryStore_1 = require("./memoryStore");
const fileMemoryBackend_1 = require("./fileMemoryBackend");
function createDefaultMemory() {
    return new memoryStore_1.MemoryStore(new fileMemoryBackend_1.FileMemoryBackend(".aries_memory.json"));
}
