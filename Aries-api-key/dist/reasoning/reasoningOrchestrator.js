"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasoningOrchestrator = void 0;
const eventBus_1 = require("../events/eventBus");
class ReasoningOrchestrator {
    constructor(bus = eventBus_1.EventBus) {
        this.bus = bus;
    }
    think(input) {
        this.bus.emit("REASONING_STEP", { input });
    }
}
exports.ReasoningOrchestrator = ReasoningOrchestrator;
