import { routeCommand } from "../src/router/commandRouter";

async function run() {

  const write = await routeCommand("MEM_WRITE::fact1=Sky is blue");
  if (write !== "MEMORY_WRITE_OK") {
    throw new Error("MEMORY WRITE FAILED");
  }

  const read = await routeCommand("MEM_READ::fact1");
  if (read !== "Sky is blue") {
    throw new Error("MEMORY READ FAILED");
  }

  const emptyKey = await routeCommand("MEM_READ::");
  if (emptyKey !== "POLICY_DENY: EMPTY_MEMORY_KEY") {
    throw new Error("EMPTY KEY POLICY FAILED");
  }

  console.log("MEMORY SUBSYSTEM TEST PASSED");
}

run();
