import { EventBus } from "../events/eventBus";
import { ReasoningOrchestrator } from "../reasoning/reasoningOrchestrator";
import { MockProvider } from "../llm/providers/mockProvider";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] Reasoning Orchestrator");

  const bus = new EventBus();
  const mock = new MockProvider();
  const reasoning = new ReasoningOrchestrator(bus, mock);

  let received: AriesEvent | undefined = undefined;

  bus.subscribe("AGENT_RESPONSE", async (evt: AriesEvent) => {
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

  const payload = (received as any).payload;

  if (payload.message !== "Hello from Aries") {
    throw new Error("Reasoning output mismatch");
  }

  console.log("REASONING ORCHESTRATOR TEST PASSED");
})();
