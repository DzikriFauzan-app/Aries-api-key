"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryController = void 0;
const memoryGovernor_1 = require("./memoryGovernor");
class MemoryController {
    constructor() {
        this.store = [];
    }
    write(plan, payload) {
        (0, memoryGovernor_1.enforceMemoryPolicy)(plan, "WRITE", this.store.length);
        this.store.push(payload);
    }
    read() {
        return this.store;
    }
    size() {
        return this.store.length;
    }
}
exports.MemoryController = MemoryController;
