import { MemoryStore } from "../memory/memoryStore";
import { Agent } from "../agent/agent";

export async function routeCommand(
  input: string,
  memory: MemoryStore,
  agent?: Agent
): Promise<any> {
  if (agent && !agent.approve()) {
    return { status: "DENIED", reason: "Approval chain failed" };
  }

  if (input === "PING") {
    return "PONG";
  }

  return { status: "UNKNOWN_COMMAND", input };
}
