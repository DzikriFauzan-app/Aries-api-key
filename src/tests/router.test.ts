import { routeCommand } from "../router/commandRouter";
import { createDefaultMemory } from "../memory";

async function run() {
  const mem = createDefaultMemory();
  const res = await routeCommand("PING", mem);
  if (res !== "PONG") throw new Error("PING FAILED");
  console.log("COMMAND ROUTER TEST PASSED");
}

run();
