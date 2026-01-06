"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultMemory = createDefaultMemory;
const memoryController_1 = require("./memoryController");
function createDefaultMemory() {
    return new memoryController_1.MemoryController();
}
