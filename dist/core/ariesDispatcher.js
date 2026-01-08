"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriesDispatcher = void 0;
const eventBus_1 = require("../events/eventBus");
const crypto_1 = require("crypto");
class AriesDispatcher {
    static async dispatchToCommander(result) {
        const OWNER_HASH = "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1";
        if (!result.finalAnswer.startsWith("ANSWER(VALID(")) {
            throw new Error("INVALID_REASONING_STRUCTURE: Logic must be synthesized.");
        }
        await this.bus.publish({
            id: (0, crypto_1.randomUUID)(),
            type: "TASK_ASSIGNED",
            source: "ARIES_BRAIN",
            timestamp: Date.now(),
            correlationId: (0, crypto_1.randomUUID)(),
            payload: {
                type: "system.exec",
                instruction: result.finalAnswer,
                params: { cmd: result.finalAnswer },
                apiKey: OWNER_HASH
            }
        });
        return { status: "OWNER_COMMAND_DISPATCHED" };
    }
}
exports.AriesDispatcher = AriesDispatcher;
AriesDispatcher.bus = new eventBus_1.EventBus();
