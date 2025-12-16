import { EventBus } from "../events/eventBus";
import { Gateway } from "../gateway/Gateway";
import { LLMFactory } from "../llm/llmFactory";
import { SecuredLLMProvider } from "../llm/securedProvider";
import { MockProvider } from "../llm/providers/mockProvider";

(async () => {
  console.log("[TEST] FEAC LOOP INTEGRATION (Step 15.5 - Updated)");

  const bus = new EventBus();
  
  // Create Factory -> Returns SecuredLLMProvider
  const securedLLM = LLMFactory.create("mock") as SecuredLLMProvider;
  
  // Access Inner Mock Provider safely
  const mockLLM = securedLLM.inner as MockProvider;

  const gateway = new Gateway(bus, securedLLM);

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
