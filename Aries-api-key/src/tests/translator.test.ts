import { EventBus } from "../events/eventBus";
import { Translator } from "../translator/translator";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] Translator");

  const bus = new EventBus();
  const translator = new Translator(bus);

  let received: AriesEvent | null = null;

  bus.subscribe("TASK_ASSIGNED", async (evt: AriesEvent) => {
    received = evt;
  });

  translator.start();

  await bus.publish({
    id: "resp-1",
    type: "AGENT_RESPONSE",
    source: "REASONING",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: {
      intent: "chat",
      message: "Halo dari Aries"
    }
  });

  if (!received) {
    throw new Error("Translator did not emit TASK_ASSIGNED");
  }

  const payload = (received as any).payload;

  if (payload.type !== "RESPOND") {
    throw new Error("Translator output wrong command type");
  }

  if (payload.message !== "Halo dari Aries") {
    throw new Error("Translator message corrupted");
  }

  console.log("TRANSLATOR TEST PASSED");
})();
