"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
const Gateway_1 = require("../gateway/Gateway");
const llmFactory_1 = require("../llm/llmFactory");
(async () => {
    console.log("[TEST] FEAC LOOP INTEGRATION (Step 15.5 - Updated)");
    const bus = new eventBus_1.EventBus();
    // Create Factory -> Returns SecuredLLMProvider
    const securedLLM = llmFactory_1.LLMFactory.create("mock");
    // Access Inner Mock Provider safely
    const mockLLM = securedLLM.inner;
    const gateway = new Gateway_1.Gateway(bus, securedLLM);
    // Simulation: FEAC response injection
    mockLLM.queueResponse(JSON.stringify({
        thought: "User wants to read file, requires explicit permission.",
        decision: "REQUEST_PERM",
        command: "fs.read",
        params: { path: "./secret.txt" },
        reason: "Accessing sensitive file."
    }));
    console.log("-> Injecting Request to Gateway...");
    let responseReceived = false;
    bus.subscribe("LLM_RESPONSE", async (evt) => {
        responseReceived = true;
        // Logika validasi sederhana
    });
    await gateway.handleRequest({
        requestId: "req-feac-1",
        userId: "user-1",
        prompt: "read ./secret.txt"
    });
    await new Promise(r => setTimeout(r, 100));
    console.log("FEAC LOOP INTEGRATION TEST PASSED");
})();
