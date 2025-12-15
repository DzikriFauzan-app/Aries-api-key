import { MemoryStore } from "../memory/memoryStore";
import { MemoryController } from "../memory/memoryController";
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
  const store = new MemoryStore();
  const audit = new AuditLogger();

  const matrix = new PermissionMatrix();
  matrix.register({
    agent: "alpha",
    role: "WORKER",
    allow: ["MEMORY_WRITE", "MEMORY_READ"]
  });

  const policy = new AgentPolicyBinder(matrix, audit);
  const memory = new MemoryController(store, policy, audit);

  const agent = new TestAgent("alpha", "WORKER");

  memory.remember(agent, "HELLO");
  memory.remember(agent, "WORLD");

  const recall = memory.recall(agent);

  if (recall.length !== 2) {
    throw new Error("MEMORY COUNT FAILED");
  }

  if (recall[0] !== "HELLO" || recall[1] !== "WORLD") {
    throw new Error("MEMORY CONTENT FAILED");
  }

  console.log("MEMORY CONTROLLER TEST PASSED");
})();
