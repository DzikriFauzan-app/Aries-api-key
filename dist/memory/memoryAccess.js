"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessMemory = accessMemory;
const memoryGovernor_1 = require("./memoryGovernor");
function accessMemory({ plan, action, memory, payload }) {
    (0, memoryGovernor_1.enforceMemoryPolicy)(plan, action, memory.length);
    if (action === "WRITE") {
        memory.push(payload);
    }
    return memory.slice(-10);
}
