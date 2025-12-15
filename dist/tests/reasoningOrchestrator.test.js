"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
const reasoningOrchestrator_1 = require("../reasoning/reasoningOrchestrator");
const mockProvider_1 = require("../llm/providers/mockProvider");
(async () => {
    console.log("[TEST] Reasoning Orchestrator");
    const bus = new eventBus_1.EventBus();
    const mock = new mockProvider_1.MockProvider();
    const reasoning = new reasoningOrchestrator_1.ReasoningOrchestrator(bus, mock);
    let received = undefined;
    bus.subscribe("AGENT_RESPONSE", async (evt) => {
        received = evt;
    });
    mock.queueResponse(JSON.stringify({
        intent: "chat",
        action: "RESPOND",
        target: null,
        message: "Hello from Aries"
    }));
    reasoning.start();
    await bus.publish({
        id: "test-1",
        type: "AGENT_COMMAND",
        source: "TEST",
        timestamp: Date.now(),
        correlationId: "sess-1",
        payload: { input: "Hello" }
    });
    // HARD GUARD
    if (!received) {
        throw new Error("No response event received from ReasoningOrchestrator");
    }
    const payload = received.payload;
    if (payload.message !== "Hello from Aries") {
        throw new Error("Reasoning output mismatch");
    }
    console.log("REASONING ORCHESTRATOR TEST PASSED");
})();
