import { EventBus } from "../events/eventBus";
import { Executor } from "../executor/executor";
import "../tools/fs"; 
import * as fs from "fs";
import * as path from "path";
import { AriesEvent } from "../events/eventTypes";

(async () => {
  console.log("[TEST] EXECUTOR CORE (Step 17)");
  
  const TEST_ROOT = path.resolve(process.cwd(), "test_workspace");
  if (fs.existsSync(TEST_ROOT)) fs.rmSync(TEST_ROOT, { recursive: true, force: true });
  fs.mkdirSync(TEST_ROOT);

  const bus = new EventBus();
  const executor = new Executor(bus, "test_workspace");
  executor.start();

  let completed: AriesEvent | null = null;
  let failed: AriesEvent | null = null;

  // FIX: Type annotation
  bus.subscribe("TASK_COMPLETED", async (evt: AriesEvent) => { completed = evt; });
  bus.subscribe("TASK_FAILED", async (evt: AriesEvent) => { failed = evt; });

  // CASE 1: WRITE FILE
  console.log("-> Executing fs.write...");
  await bus.publish({
    id: "ex-1",
    type: "TASK_APPROVED",
    source: "FEAC",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: {
      type: "fs.write",
      params: { path: "hello.txt", content: "ARIES_LIVES" }
    }
  });

  await new Promise(r => setTimeout(r, 100));

  if (!completed) throw new Error("Executor silent on success");
  const fileContent = fs.readFileSync(path.join(TEST_ROOT, "hello.txt"), "utf-8");
  if (fileContent !== "ARIES_LIVES") throw new Error("File content corrupted");

  // CASE 2: READ FILE
  completed = null; 
  console.log("-> Executing fs.read...");
  await bus.publish({
    id: "ex-2",
    type: "TASK_APPROVED",
    source: "FEAC",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: {
      type: "fs.read",
      params: { path: "hello.txt" }
    }
  });

  await new Promise(r => setTimeout(r, 50));
  const payload = completed ? (completed as AriesEvent).payload : null;
  
  if (!payload || payload.result !== "ARIES_LIVES") {
    throw new Error("Read failed or mismatch");
  }

  // CASE 3: SECURITY BREACH
  console.log("-> Executing Path Traversal Attack...");
  await bus.publish({
    id: "ex-3",
    type: "TASK_APPROVED",
    source: "FEAC",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: {
      type: "fs.read",
      params: { path: "../../../etc/passwd" }
    }
  });

  await new Promise(r => setTimeout(r, 50));
  if (!failed) throw new Error("Executor allowed path traversal!");
  
  const failPayload = (failed as AriesEvent).payload;
  if (!failPayload.error.includes("Security Violation")) {
    throw new Error("Wrong error message for security breach");
  }

  fs.rmSync(TEST_ROOT, { recursive: true, force: true });
  console.log("EXECUTOR TEST PASSED");
})();
