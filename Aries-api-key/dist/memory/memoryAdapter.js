"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryAdapter = void 0;
class MemoryAdapter {
    constructor(controller) {
        this.controller = controller;
    }
    read(key) {
        return this.controller.recall(key);
    }
    write(key, value) {
        this.controller.remember(key, value);
    }
    clearByPrefix(prefix) {
        this.controller.forgetByPrefix(prefix);
    }
}
exports.MemoryAdapter = MemoryAdapter;
