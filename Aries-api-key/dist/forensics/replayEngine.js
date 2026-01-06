"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplayEngine = void 0;
const eventBus_1 = require("../events/eventBus");
class ReplayEngine {
    constructor(bus = eventBus_1.EventBus) {
        this.bus = bus;
    }
    replay(events) {
        for (const e of events) {
            this.bus.emit("REPLAY_EVENT", e);
        }
    }
}
exports.ReplayEngine = ReplayEngine;
