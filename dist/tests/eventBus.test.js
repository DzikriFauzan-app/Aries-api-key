"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
(async () => {
    const bus = new eventBus_1.EventBus();
    let specificCount = 0;
    let wildcardCount = 0;
    let errorHandled = true; // Asumsi positif
    console.log("[TEST] Setup Listeners...");
    // 1. Specific Listener
    bus.subscribe("AGENT_RESPONSE", async (evt) => {
        specificCount++;
        if (evt.payload.data !== "SECRET_DATA") {
            throw new Error("Payload corruption detected!");
        }
    });
    // 2. Wildcard Listener (Spy)
    bus.subscribe("*", async (evt) => {
        wildcardCount++;
        // Wildcard harus menerima event apa saja
        if (evt.type !== "AGENT_RESPONSE" && evt.type !== "SYSTEM_START") {
            // throw new Error("Unexpected event type in wildcard"); // Optional check
        }
    });
    // 3. Bad Listener (Simulasi Error)
    bus.subscribe("AGENT_RESPONSE", async () => {
        throw new Error("I AM A BUGGY PLUGIN");
    });
    console.log("[TEST] Dispatching Events...");
    // Event 1: Normal
    await bus.publish({
        id: "evt-1",
        type: "AGENT_RESPONSE",
        source: "TEST",
        timestamp: Date.now(),
        payload: { data: "SECRET_DATA" }
    });
    // Event 2: Tipe Lain (Hanya Wildcard yang dengar)
    await bus.publish({
        id: "evt-2",
        type: "SYSTEM_START",
        source: "KERNEL",
        timestamp: Date.now(),
        payload: {}
    });
    console.log("[TEST] Verifying Logic...");
    // Verifikasi Specific
    // Harus 1 (karena Event 2 beda tipe)
    if (specificCount !== 1) {
        throw new Error(`SPECIFIC LISTENER FAILED: Expected 1, got ${specificCount}`);
    }
    // Verifikasi Wildcard
    // Harus 2 (karena dengar semua)
    if (wildcardCount !== 2) {
        throw new Error(`WILDCARD LISTENER FAILED: Expected 2, got ${wildcardCount}`);
    }
    // Verifikasi Robustness
    // Code di atas tidak crash meski ada 'Bad Listener'.
    // Jika script ini sampai baris ini, berarti Fault Tolerance bekerja.
    // Test Unsubscribe
    const tempHandler = async () => { console.log("Should not run"); };
    bus.subscribe("AUDIT_LOG", tempHandler);
    if (bus.listenerCount("AUDIT_LOG") !== 1)
        throw new Error("Subscribe failed");
    bus.unsubscribe("AUDIT_LOG", tempHandler);
    if (bus.listenerCount("AUDIT_LOG") !== 0)
        throw new Error("Unsubscribe failed");
    console.log("EVENT BUS TEST PASSED (All Checks: Specific, Wildcard, Robustness, Unsubscribe)");
})();
