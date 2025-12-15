"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
const feacLoop_1 = require("../feac/feacLoop");
(async () => {
    console.log("[TEST] FEAC LOOP");
    const bus = new eventBus_1.EventBus();
    const feac = new feacLoop_1.FeacLoop(bus);
    let approved = null;
    bus.subscribe("TASK_APPROVED", async (evt) => {
        approved = evt;
    });
    feac.start();
    await bus.publish({
        id: "task-1",
        type: "TASK_ASSIGNED",
        source: "REASONING",
        timestamp: Date.now(),
        correlationId: "sess-42",
        payload: {
            action: "WRITE_FILE",
            path: "/sandbox/a.txt",
            content: "hello"
        }
    });
    if (!approved) {
        throw new Error("FEAC did not approve task");
    }
    if (approved.payload.action !== "WRITE_FILE") {
        throw new Error("Payload corrupted");
    }
    console.log("FEAC LOOP TEST PASSED");
})();
