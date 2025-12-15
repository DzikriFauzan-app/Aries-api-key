import { EventBus } from "../events/eventBus";
import { FeacLoop } from "../feac/feacLoop";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] FEAC LOOP");

  const bus = new EventBus();
  const feac = new FeacLoop(bus);

  let approved: AriesEvent | null = null;

  bus.subscribe("TASK_APPROVED", async (evt) => {
    approved = evt;
  });

  feac.start();

  await bus.publish({
    id: "task-1",
    type: "TASK_ASSIGNED",
    source: "REASONING",
    timestamp: Date.now(),
    correlationId: "sess-42",
    payload: {
      action: "WRITE_FILE",
      path: "/sandbox/a.txt",
      content: "hello"
    }
  });

  if (!approved) {
    throw new Error("FEAC did not approve task");
  }

  if ((approved as any).payload.action !== "WRITE_FILE") {
    throw new Error("Payload corrupted");
  }

  console.log("FEAC LOOP TEST PASSED");
})();
