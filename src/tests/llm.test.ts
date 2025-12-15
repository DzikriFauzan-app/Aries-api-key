import { LLMFactory } from "../llm/llmFactory";
import { MockProvider } from "../llm/providers/mockProvider";

(async () => {
  console.log("[TEST] Initializing LLM Factory...");

  // 1. Test Factory Creation
  const provider = LLMFactory.create("mock");
  if (provider.name !== "mock-v1") {
    throw new Error(`Factory failed: Expected mock-v1, got ${provider.name}`);
  }

  // 2. Test Mock Injection
  const mock = provider as MockProvider;
  mock.queueResponse("I am Aries");

  // 3. Test Generation
  console.log("[TEST] Generating Response...");
  const result = await provider.generate({
    prompt: "Who are you?",
    temperature: 0.5
  });

  if (result.text !== "I am Aries") {
    throw new Error(`Mock failed: Expected 'I am Aries', got '${result.text}'`);
  }

  if (!result.usage) {
    throw new Error("Usage stats missing");
  }

  console.log("LLM ADAPTER TEST PASSED");
})();
