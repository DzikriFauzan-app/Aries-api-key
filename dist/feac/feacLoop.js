"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeacLoop = void 0;
const crypto_1 = require("crypto");
class FeacLoop {
    constructor(bus) {
        this.bus = bus;
    }
    start() {
        this.bus.subscribe("TASK_ASSIGNED", async (evt) => {
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "TASK_APPROVED",
                source: "FEAC",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: evt.payload
            });
        });
    }
}
exports.FeacLoop = FeacLoop;
