import { MemoryController } from "../memory/memoryController";
import { MemoryStore } from "../memory/memoryStore";
import { FileMemoryBackend } from "../memory/fileMemoryBackend";
import { PermissionMatrix } from "../policy/permissionMatrix";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { AuditLogger } from "../audit/auditLogger";
import { Agent } from "../agent/agent";

class TestAgent extends Agent {
  async handle(): Promise<string> {
    return "";
  }
}

(() => {
  const backend = new FileMemoryBackend(".test_memory.json");
  const store = new MemoryStore(backend);

  const matrix = new PermissionMatrix();
  matrix.register({
    agent: "alpha",
    role: "WORKER",
    allow: ["MEMORY_WRITE", "MEMORY_READ"]
  });

  const audit = new AuditLogger();
  const policy = new AgentPolicyBinder(matrix, audit);

  const memory = new MemoryController(store, policy, audit);
  const agent = new TestAgent("alpha", "WORKER");

  memory.remember(agent, "HELLO");
  memory.remember(agent, "WORLD");

  const recall = memory.recall(agent);
  if (recall.length !== 2) throw new Error("RECALL FAILED");

  memory.prune(1);
  const recall2 = memory.recall(agent);
  if (recall2.length !== 1) throw new Error("PRUNE FAILED");

  console.log("MEMORY CONTROLLER TEST PASSED");
})();
