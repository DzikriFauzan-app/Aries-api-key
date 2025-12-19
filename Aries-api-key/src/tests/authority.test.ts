import { EventBus } from "../events/eventBus";
import { FeacLoop } from "../feac/feacLoop";
import { Executor } from "../executor/executor";
import "../tools/fs"; // Load FS Tools Registry
import { AriesEvent } from "../events/eventTypes";
import * as fs from "fs";
import * as path from "path";

(async () => {
  console.log("[TEST] AUTHORITY BINDER (Step 19 - Fixed)");
  
  const TEST_ROOT = "auth_test_area";
  if (fs.existsSync(TEST_ROOT)) fs.rmSync(TEST_ROOT, { recursive: true, force: true });

  const bus = new EventBus();
  const feac = new FeacLoop(bus);
  // Pastikan Executor load registry
  const executor = new Executor(bus, TEST_ROOT);

  feac.start();
  executor.start();

  let rejected: AriesEvent | null = null;
  let failed: AriesEvent | null = null;
  let completed: AriesEvent | null = null;

  bus.subscribe("TASK_REJECTED", async (evt: AriesEvent) => { rejected = evt; });
  bus.subscribe("TASK_FAILED", async (evt: AriesEvent) => { failed = evt; });
  bus.subscribe("TASK_COMPLETED", async (evt: AriesEvent) => { completed = evt; });

  // CASE 1: SCOPE DENIAL (Guest tries to Write)
  console.log("-> Testing Scope Denial...");
  await bus.publish({
    id: "t1", type: "TASK_ASSIGNED", source: "TRANS", timestamp: Date.now(),
    payload: {
      type: "fs.write", // FIX: Use correct tool name
      apiKey: "guest-key",
      params: { path: "hack.txt", content: "hacked" }
    }
  });
  
  await new Promise(r => setTimeout(r, 50));
  
  if (!rejected || (rejected as any).payload.reason !== "SCOPE_DENIED") {
    throw new Error("Guest write should be rejected");
  }

  // CASE 2: FORGED TASK (Direct to Executor)
  console.log("-> Testing Forged Task...");
  await bus.publish({
    id: "t2", type: "TASK_APPROVED", source: "HACKER", timestamp: Date.now(),
    payload: {
      type: "fs.write", // FIX: Use correct tool name
      params: { path: "hack.txt", content: "hacked" }
      // NO AUTHORITY
    }
  });

  await new Promise(r => setTimeout(r, 50));
  
  if (!failed || !(failed as any).payload.error.includes("Unsigned")) {
    throw new Error("Unsigned task should be failed by Executor");
  }

  // CASE 3: VALID FLOW (System Key)
  console.log("-> Testing Valid Flow...");
  await bus.publish({
    id: "t3", type: "TASK_ASSIGNED", source: "TRANS", timestamp: Date.now(),
    payload: {
      type: "fs.write", // FIX: Use correct tool name
      apiKey: "aries-master-key-123",
      params: { path: "legal.txt", content: "approved" }
    }
  });

  await new Promise(r => setTimeout(r, 100));
  if (!completed) throw new Error("Valid task failed to complete");

  // Cleanup
  fs.rmSync(TEST_ROOT, { recursive: true, force: true });
  console.log("AUTHORITY TEST PASSED");
})();
