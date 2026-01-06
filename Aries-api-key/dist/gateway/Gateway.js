"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = void 0;
const eventBus_1 = require("../events/eventBus");
class Gateway {
    constructor(bus = eventBus_1.EventBus) {
        this.bus = bus;
        this.bus.subscribe("AGENT_RESPONSE", async (event) => {
            // response routing handled here
        });
    }
}
exports.Gateway = Gateway;
