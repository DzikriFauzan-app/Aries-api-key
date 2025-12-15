"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = void 0;
const crypto_1 = require("crypto");
class Translator {
    constructor(bus) {
        this.bus = bus;
    }
    start() {
        this.bus.subscribe("AGENT_RESPONSE", async (evt) => {
            await this.translate(evt);
        });
    }
    async translate(evt) {
        const payload = evt.payload;
        // CHAT / RESPONSE
        if (payload.intent === "chat" || payload.intent === "greeting") {
            const cmd = {
                type: "RESPOND",
                message: payload.message
            };
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "TASK_ASSIGNED",
                source: "TRANSLATOR",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: cmd
            });
            return;
        }
        // FILE CREATE (PREVIEW UNTUK STEP 16)
        if (payload.intent === "file_create") {
            const cmd = {
                type: "FILE_WRITE",
                path: payload.path,
                content: payload.content
            };
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "TASK_ASSIGNED",
                source: "TRANSLATOR",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: cmd
            });
            return;
        }
        throw new Error("Translator: Unknown intent");
    }
}
exports.Translator = Translator;
