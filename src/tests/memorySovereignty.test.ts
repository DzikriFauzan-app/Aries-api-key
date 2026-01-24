import { EventBus } from "../events/eventBus";
import { MemoryController } from "../memory/memoryController";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] MEMORY SOVEREIGNTY (STEP 20)");

  const bus = new EventBus();
  const memory = new MemoryController(bus);
  memory.start();

  let denied: AriesEvent | null = null;
  let result: AriesEvent | null = null;

  bus.subscribe("MEMORY_DENIED", async (e: AriesEvent) => { denied = e; });
  bus.subscribe("MEMORY_RESULT", async (e: AriesEvent) => { result = e; });

  // VALID WRITE
  await bus.publish({
    id: "m1",
    type: "MEMORY_WRITE",
    source: "EXECUTOR",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: {
      action: "MEMORY_WRITE",
      scope: "SESSION",
      key: "sess-1:context",
      value: "SECRET",
      authority: {
        signature: "signed",
        scope: "SESSION",
        issuedAt: Date.now()
      }
    }
  });

  await new Promise(r => setTimeout(r, 50));
  if (!result) throw new Error("Memory write failed");

  // ILLEGAL READ
  await bus.publish({
    id: "m2",
    type: "MEMORY_READ",
    source: "EXECUTOR",
    timestamp: Date.now(),
    correlationId: "sess-2", 
    payload: {
      action: "MEMORY_READ",
      scope: "SESSION",
      key: "sess-1:context",
      authority: {
        signature: "signed",
        scope: "SESSION",
        issuedAt: Date.now()
      }
    }
  });

  await new Promise(r => setTimeout(r, 50));
  if (!denied) throw new Error("Session leak allowed");

  console.log("MEMORY SOVEREIGNTY TEST PASSED");
})();
