import { MemoryController } from "../memory/memoryController";
import { MemoryStore } from "../memory/memoryStore";
import { FileMemoryBackend } from "../memory/fileMemoryBackend";
import { PermissionMatrix } from "../policy/permissionMatrix";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { AuditLogger } from "../audit/auditLogger";
import { Agent } from "../agent/agent";
import * as fs from "fs"; // Tambahkan FS

class TestAgent extends Agent {
  async handle(): Promise<string> {
    return "";
  }
}

(() => {
  const DB_FILE = ".test_memory.json";

  // FIX: Hapus file sampah sisa test sebelumnya agar mulai dari 0
  if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
  }

  const backend = new FileMemoryBackend(DB_FILE);
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
  
  // Debug jika gagal lagi (biar kita tahu isinya apa)
  if (recall.length !== 2) {
    console.error("RECALL CONTENT:", recall);
    throw new Error(`RECALL FAILED: Expected 2, got ${recall.length}`);
  }

  memory.prune(1);
  const recall2 = memory.recall(agent);
  if (recall2.length !== 1) throw new Error("PRUNE FAILED");

  // Cleanup setelah selesai
  if (fs.existsSync(DB_FILE)) {
    fs.unlinkSync(DB_FILE);
  }

  console.log("MEMORY CONTROLLER TEST PASSED");
})();
