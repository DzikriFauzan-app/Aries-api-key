import { Sandbox } from "../sandbox/sandbox";
import * as fs from "fs";
import * as path from "path";

(async () => {
  console.log("[TEST] SANDBOX");

  const ROOT = path.resolve(process.cwd(), "sandbox_test");
  if (fs.existsSync(ROOT)) fs.rmSync(ROOT, { recursive: true, force: true });

  const sandbox = new Sandbox("sandbox_test");

  await sandbox.writeFile("a.txt", "HELLO");
  const text = await sandbox.readFile("a.txt");
  if (text !== "HELLO") throw new Error("Sandbox read/write failed");

  try {
    await sandbox.readFile("../../etc/passwd");
    throw new Error("Traversal allowed");
  } catch {}

  console.log("SANDBOX TEST PASSED");
})();
