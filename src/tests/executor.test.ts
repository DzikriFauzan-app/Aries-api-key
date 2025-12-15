import { EventBus } from "../events/eventBus";
import { Executor } from "../executor/executor";
import "../tools/fs"; 
import * as fs from "fs";
import * as path from "path";
import { AriesEvent } from "../events/eventTypes";
import { signPayload } from "../auth/authority"; // Import Signer
import { SYSTEM_KEY_DEF } from "../auth/types"; // Import System Key ID

(async () => {
  console.log("[TEST] EXECUTOR CORE (Step 17 - Zero Trust Compliant)");
  
  const TEST_ROOT = path.resolve(process.cwd(), "test_workspace");
  if (fs.existsSync(TEST_ROOT)) fs.rmSync(TEST_ROOT, { recursive: true, force: true });
  
  const bus = new EventBus();
  const executor = new Executor(bus, "test_workspace");
  executor.start();

  let completed: AriesEvent | null = null;
  let failed: AriesEvent | null = null;

  bus.subscribe("TASK_COMPLETED", async (evt: AriesEvent) => { completed = evt; });
  bus.subscribe("TASK_FAILED", async (evt: AriesEvent) => { failed = evt; });

  // HELPER: Create Signed Payload
  const createSignedPayload = (type: string, params: any) => {
    const signature = signPayload(params, SYSTEM_KEY_DEF.id);
    return {
      type,
      params,
      authority: {
        keyId: SYSTEM_KEY_DEF.id,
        signature
      }
    };
  };

  // CASE 1: WRITE FILE (SIGNED)
  console.log("-> Executing fs.write (Signed)...");
  await bus.publish({
    id: "ex-1",
    type: "TASK_APPROVED",
    source: "FEAC",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: createSignedPayload("fs.write", { path: "hello.txt", content: "ARIES_LIVES" })
  });

  await new Promise(r => setTimeout(r, 100));

  if (!completed) throw new Error("Executor silent on success (Signature rejected?)");
  
  const fileContent = fs.readFileSync(path.join(TEST_ROOT, "hello.txt"), "utf-8");
  if (fileContent !== "ARIES_LIVES") throw new Error("File content corrupted");

  // CASE 2: READ FILE (SIGNED)
  completed = null; 
  console.log("-> Executing fs.read (Signed)...");
  await bus.publish({
    id: "ex-2",
    type: "TASK_APPROVED",
    source: "FEAC",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: createSignedPayload("fs.read", { path: "hello.txt" })
  });

  await new Promise(r => setTimeout(r, 50));
  const payload = completed ? (completed as AriesEvent).payload : null;
  
  if (!payload || payload.result !== "ARIES_LIVES") {
    throw new Error("Read failed or mismatch");
  }

  // CASE 3: SECURITY BREACH (Traversal Attack - Signed but Malicious Params)
  // Executor tetap harus reject di level Sandbox walaupun signature valid
  console.log("-> Executing Path Traversal Attack (Signed)...");
  
  // Note: Path traversal logic ada di Sandbox, bukan di Authority Check.
  // Authority check lulus (karena signed), tapi Sandbox check gagal.
  await bus.publish({
    id: "ex-3",
    type: "TASK_APPROVED",
    source: "FEAC",
    timestamp: Date.now(),
    correlationId: "sess-1",
    payload: createSignedPayload("fs.read", { path: "../../../etc/passwd" })
  });

  await new Promise(r => setTimeout(r, 50));
  if (!failed) throw new Error("Executor allowed path traversal!");
  
  const failPayload = (failed as AriesEvent).payload;
  
  // Cek pesan error Sandbox
  if (!failPayload.error.includes("Path traversal blocked")) {
    throw new Error(`Wrong error message: ${failPayload.error}`);
  }

  // Cleanup
  fs.rmSync(TEST_ROOT, { recursive: true, force: true });
  console.log("EXECUTOR TEST PASSED");
})();
