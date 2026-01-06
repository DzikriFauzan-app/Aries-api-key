"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultMemory = createDefaultMemory;
const memoryController_1 = require("./memoryController");
const eventBus_1 = require("../events/eventBus");
function createDefaultMemory(bus = eventBus_1.EventBus) {
    return new memoryController_1.MemoryController(bus);
}
