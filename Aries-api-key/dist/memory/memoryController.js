"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryController = void 0;
exports.tenantMemoryKey = tenantMemoryKey;
const eventBus_1 = require("../events/eventBus");
class MemoryController {
    constructor(bus = eventBus_1.EventBus) {
        this.bus = bus;
    }
    remember(key, value) {
        this.bus.emit("MEMORY_WRITE", { key, value });
    }
}
exports.MemoryController = MemoryController;
function tenantMemoryKey(ns, key) {
    return `${ns}:${key}`;
}
