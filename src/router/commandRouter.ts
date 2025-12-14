import { ReasoningEngine } from "../core/reasoningEngine";
import { PolicyEngine } from "../policy/policyEngine";
import { MemoryStore } from "../memory/memoryStore";

export async function routeCommand(input: string): Promise<string> {
  if (input === "PING") return "PONG";

  const engine = new ReasoningEngine();
  const policy = new PolicyEngine();
  const memory = MemoryStore.get();

  if (!input || input.trim() === "") {
    return "ERROR: EMPTY_COMMAND";
  }

  const parts = input.split("::");
  if (parts.length !== 2) {
    return "ERROR: INVALID_COMMAND_FORMAT";
  }

  const command = parts[0].toUpperCase();
  const payload = parts[1].trim();

  try {
    switch (command) {
      case "MEM_WRITE": {
        const [k, v] = payload.split("=");
        policy.memoryWrite(k, v);
        memory.write(k, v);
        return "MEMORY_WRITE_OK";
      }
      case "MEM_READ": {
        const key = payload;
        policy.memoryRead(key);
        return memory.read(key) ?? "MEMORY_NOT_FOUND";
      }
      case "REASON": {
        policy.preExecute(command, payload);
        const out = engine.execute("generic_reasoning", payload).finalAnswer;
        policy.postExecute(out);
        return out;
      }
      case "CHECK": {
        policy.preExecute(command, payload);
        const out = engine.execute("consistency_check", payload).finalAnswer;
        policy.postExecute(out);
        return out;
      }
      default:
        return "ERROR: UNKNOWN_COMMAND";
    }
  } catch (e: any) {
    return e?.message ?? "ERROR";
  }
}
