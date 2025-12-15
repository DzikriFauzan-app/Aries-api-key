import { EventBus } from "../events/eventBus";
import { MemoryController } from "../memory/memoryController";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] MEMORY SECURITY (Refactored for Step 20)");

  const bus = new EventBus();
  const memory = new MemoryController(bus);
  memory.start();

  let denied: AriesEvent | null = null;
  bus.subscribe("MEMORY_DENIED", async (e: AriesEvent) => { denied = e; });

  // CASE: UNSIGNED ACCESS (Security Breach)
  console.log("-> Testing Unsigned Access...");
  
  await bus.publish({
    id: "sec-1",
    type: "MEMORY_WRITE",
    source: "HACKER",
    timestamp: Date.now(),
    correlationId: "sess-hacker",
    payload: {
      action: "MEMORY_WRITE",
      scope: "SESSION",
      key: "sess-hacker:secret",
      value: "MALWARE",
      // authority: MISSING!
    }
  });

  await new Promise(r => setTimeout(r, 50));
  
  if (!denied) throw new Error("Unsigned write was allowed!");
  if (!(denied as any).payload.error.includes("Unsigned")) {
    throw new Error("Wrong error message for security breach");
  }

  console.log("MEMORY SECURITY TEST PASSED");
})();
