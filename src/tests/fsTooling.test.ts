import { getFsTool, listFsTools } from "../tools/fs/fsRegistry";
import "../tools/fs";

(async () => {
  console.log("[TEST] FS TOOLING");

  const tools = listFsTools();
  if (tools.length !== 3) {
    throw new Error("FS tools not fully registered");
  }

  const read = getFsTool("fs.read");
  if (!read.readOnly) {
    throw new Error("fs.read must be readOnly");
  }

  const write = getFsTool("fs.write");
  if (write.readOnly) {
    throw new Error("fs.write must NOT be readOnly");
  }

  try {
    getFsTool("fs.delete" as any);
    throw new Error("Illegal tool passed");
  } catch {}

  console.log("FS TOOLING TEST PASSED");
})();
