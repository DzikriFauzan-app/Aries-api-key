"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
(async () => {
    const bus = new eventBus_1.EventBus();
    let specificCount = 0;
    let wildcardCount = 0;
    console.log("[TEST] Setup Listeners...");
    bus.subscribe("AGENT_RESPONSE", async (evt) => {
        specificCount++;
        const payload = evt.payload;
        if (payload.data !== "SECRET_DATA") {
            throw new Error("Payload corruption detected!");
        }
    });
    bus.subscribe("*", async () => {
        wildcardCount++;
    });
    bus.subscribe("AGENT_RESPONSE", async () => {
        throw new Error("I AM A BUGGY PLUGIN");
    });
    console.log("[TEST] Dispatching Events...");
    await bus.publish({
        id: "evt-1",
        type: "AGENT_RESPONSE",
        source: "TEST",
        timestamp: Date.now(),
        payload: { data: "SECRET_DATA" }
    });
    await bus.publish({
        id: "evt-2",
        type: "SYSTEM_START",
        source: "KERNEL",
        timestamp: Date.now(),
        payload: {}
    });
    console.log("[TEST] Verifying Logic...");
    if (specificCount !== 1) {
        throw new Error(`SPECIFIC LISTENER FAILED: ${specificCount}`);
    }
    if (wildcardCount !== 2) {
        throw new Error(`WILDCARD LISTENER FAILED: ${wildcardCount}`);
    }
    const tempHandler = async () => { };
    bus.subscribe("AUDIT_LOG", tempHandler);
    if (bus.listenerCount("AUDIT_LOG") !== 1) {
        throw new Error("Subscribe failed");
    }
    bus.unsubscribe("AUDIT_LOG", tempHandler);
    if (bus.listenerCount("AUDIT_LOG") !== 0) {
        throw new Error("Unsubscribe failed");
    }
    console.log("EVENT BUS TEST PASSED");
})();
