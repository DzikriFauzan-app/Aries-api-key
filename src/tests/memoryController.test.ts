import { EventBus } from "../events/eventBus";
import { MemoryController } from "../memory/memoryController";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] MEMORY CONTROLLER (Refactored for Step 20)");

  const bus = new EventBus();
  const memory = new MemoryController(bus);
  memory.start();

  let readResult: AriesEvent | null = null;
  bus.subscribe("MEMORY_RESULT", async (e: AriesEvent) => { readResult = e; });

  // 1. TEST WRITE (Gantikan memory.remember)
  console.log("-> Testing Write (via Event)...");
  await bus.publish({
    id: "leg-1",
    type: "MEMORY_WRITE",
    source: "TEST_LEGACY",
    timestamp: Date.now(),
    correlationId: "sess-legacy",
    payload: {
      action: "MEMORY_WRITE",
      scope: "SESSION",
      key: "sess-legacy:data1",
      value: "HELLO WORLD",
      authority: { signature: "bypass-test", scope: "SESSION", issuedAt: Date.now() }
    }
  });

  // Tunggu sebentar
  await new Promise(r => setTimeout(r, 50));
  if (!readResult) throw new Error("Write failed (No Result Event)");
  
  // 2. TEST READ (Gantikan memory.recall)
  readResult = null;
  console.log("-> Testing Read (via Event)...");
  await bus.publish({
    id: "leg-2",
    type: "MEMORY_READ",
    source: "TEST_LEGACY",
    timestamp: Date.now(),
    correlationId: "sess-legacy",
    payload: {
      action: "MEMORY_READ",
      scope: "SESSION",
      key: "sess-legacy:data1",
      authority: { signature: "bypass-test", scope: "SESSION", issuedAt: Date.now() }
    }
  });

  await new Promise(r => setTimeout(r, 50));
  
  if (!readResult) throw new Error("Read failed (No Result Event)");
  const content = (readResult as any).payload.result;
  
  if (content !== "HELLO WORLD") {
    throw new Error(`Content Mismatch: Got ${content}`);
  }

  console.log("MEMORY CONTROLLER TEST PASSED");
})();
