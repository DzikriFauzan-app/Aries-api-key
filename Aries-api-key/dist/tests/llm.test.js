"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const llmFactory_1 = require("../llm/llmFactory");
(async () => {
    console.log("[TEST] Initializing LLM Factory...");
    const provider = llmFactory_1.LLMFactory.create("mock");
    // Debug log
    console.log(`[DEBUG] Provider Name is: ${provider.name}`);
    // FIX: Izinkan nama provider mengandung "mock-v1" (support wrapper Secured)
    if (!provider.name.includes("mock-v1")) {
        throw new Error(`Factory failed: Expected provider to contain 'mock-v1', got '${provider.name}'`);
    }
    console.log("[TEST] Generating Response...");
    const response = await provider.generate({
        prompt: "Hello",
        temperature: 0.7
    });
    if (!response.text) {
        throw new Error("Empty response from LLM");
    }
    console.log("LLM ADAPTER TEST PASSED");
})();
