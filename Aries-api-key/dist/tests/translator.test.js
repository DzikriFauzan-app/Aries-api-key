"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
const translator_1 = require("../translator/translator");
(async () => {
    console.log("[TEST] Translator");
    const bus = new eventBus_1.EventBus();
    const translator = new translator_1.Translator(bus);
    let received = null;
    bus.subscribe("TASK_ASSIGNED", async (evt) => {
        received = evt;
    });
    translator.start();
    await bus.publish({
        id: "resp-1",
        type: "AGENT_RESPONSE",
        source: "REASONING",
        timestamp: Date.now(),
        correlationId: "sess-1",
        payload: {
            intent: "chat",
            message: "Halo dari Aries"
        }
    });
    if (!received) {
        throw new Error("Translator did not emit TASK_ASSIGNED");
    }
    const payload = received.payload;
    if (payload.type !== "RESPOND") {
        throw new Error("Translator output wrong command type");
    }
    if (payload.message !== "Halo dari Aries") {
        throw new Error("Translator message corrupted");
    }
    console.log("TRANSLATOR TEST PASSED");
})();
