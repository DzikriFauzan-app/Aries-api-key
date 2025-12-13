import { ReasoningEngine } from "../core/reasoningEngine";
import { PolicyEngine } from "../policy/policyEngine";
import { MemoryStore } from "../memory/memoryStore";

const engine = new ReasoningEngine();
const policy = new PolicyEngine();
const memory = new MemoryStore();

export async function routeCommand(input: string): Promise<string> {
  // === ROUTING DETERMINISM HANDLER ===
  if (input === "PING") {
    return "PONG";
  }

  if (!input || input.trim().length === 0) {
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
        const kv = payload.split("=");
        if (kv.length !== 2) {
          return "ERROR: INVALID_MEMORY_FORMAT";
        }
        const key = kv[0].trim();
        const value = kv[1].trim();

        policy.memoryWrite(key, value);
        memory.write(key, value);
        return "MEMORY_WRITE_OK";
      }

      case "MEM_READ": {
        const key = payload.trim();
        policy.memoryRead(key);
        const record = memory.read(key);
        return record ? record : "MEMORY_NOT_FOUND";
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
  } catch (err: any) {
    return err?.message ?? "ERROR";
  }
}
