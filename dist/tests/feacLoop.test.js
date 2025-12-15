"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const eventBus_1 = require("../events/eventBus");
const server_1 = require("../gateway/server");
const reasoningOrchestrator_1 = require("../reasoning/reasoningOrchestrator");
const translator_1 = require("../translator/translator");
const mockProvider_1 = require("../llm/providers/mockProvider");
(async () => {
    console.log("[TEST] FEAC LOOP INTEGRATION (Step 15.5 - Updated)");
    const bus = new eventBus_1.EventBus();
    const mockLLM = new mockProvider_1.MockProvider();
    // Port 0 random
    const gateway = new server_1.AriesGateway(bus, 0);
    const reasoning = new reasoningOrchestrator_1.ReasoningOrchestrator(bus, mockLLM);
    const translator = new translator_1.Translator(bus);
    reasoning.start();
    translator.start();
    // NOTE: Kita tidak perlu menyalakan FEAC Loop class manual di sini
    // karena test ini HANYA menguji integrasi sampai TRANSLATOR emit TASK_ASSIGNED
    // NAMUN, jika judulnya FEAC LOOP, kita harus memastikan sampai TASK_APPROVED.
    // Load FEAC Class
    const { FeacLoop } = require("../feac/feacLoop");
    const feac = new FeacLoop(bus);
    feac.start();
    let finalOutput = null;
    bus.subscribe("TASK_APPROVED", async (evt) => {
        finalOutput = evt;
    });
    // MOCK LLM Response (Valid Chat)
    mockLLM.queueResponse(JSON.stringify({
        intent: "chat",
        action: "RESPOND",
        target: null,
        message: "Halo User, saya Aries."
    }));
    console.log("-> Injecting Request to Gateway...");
    const app = gateway.getServer();
    const response = await app.inject({
        method: 'POST',
        url: '/v1/command',
        headers: { 'x-aries-key': 'aries-master-key-123' }, // AUTH STEP 19
        payload: {
            session_id: "feac-session-123",
            user_id: "admin",
            input: "Siapa kamu?"
        }
    });
    if (response.statusCode !== 202) {
        throw new Error(`Gateway rejected request: ${response.statusCode}`);
    }
    // Tunggu async processes
    await new Promise(r => setTimeout(r, 200));
    if (!finalOutput) {
        throw new Error("FEAC Loop Timeout: No TASK_APPROVED event received");
    }
    const result = finalOutput.payload;
    // Translator -> RESPOND -> FEAC (Allow Null Scope for RESPOND) -> Approved
    if (result.type !== "RESPOND") {
        throw new Error(`Wrong output type. Expected RESPOND, got ${result.type}`);
    }
    // Cek Signature (Step 19 Requirement)
    if (!result.authority || !result.authority.signature) {
        throw new Error("Missing Authority Signature on Approved Task");
    }
    console.log("FEAC LOOP INTEGRATION TEST PASSED");
})();
