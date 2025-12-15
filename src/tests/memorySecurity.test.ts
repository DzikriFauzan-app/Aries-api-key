import { MemoryStore } from "../memory/memoryStore";
import { MemoryController } from "../memory/memoryController";
import { FileMemoryBackend } from "../memory/fileMemoryBackend";
import { PermissionMatrix } from "../policy/permissionMatrix";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { AuditLogger } from "../audit/auditLogger";
import { Agent } from "../agent/agent";
import * as fs from "fs";

class TestAgent extends Agent {
  async handle(): Promise<string> { return ""; }
}

(() => {
  const TEST_FILE = ".security_test.json";
  // Bersihkan file sisa sebelum mulai (untuk safety)
  if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);

  const backend = new FileMemoryBackend(TEST_FILE);
  const store = new MemoryStore(backend);
  const matrix = new PermissionMatrix();
  
  // FIX: Gunakan Role "WORKER" yang standar, bukan "SPY"
  matrix.register({
    agent: "secret_agent",
    role: "WORKER", 
    allow: ["MEMORY_WRITE", "MEMORY_READ"]
  });

  const audit = new AuditLogger();
  const policy = new AgentPolicyBinder(matrix, audit);
  const memory = new MemoryController(store, policy, audit);
  
  // FIX: Gunakan Role "WORKER" saat spawn agent
  const agent = new TestAgent("secret_agent", "WORKER");

  // 1. Test Compression
  const messyText = "  Hello    World   ";
  memory.remember(agent, messyText, false); // Not sensitive

  const recall1 = memory.recall(agent);
  if (recall1[0] !== "Hello World") {
    throw new Error(`COMPRESSION FAILED: Got '${recall1[0]}'`);
  }

  // 2. Test Encryption
  const secret = "BLUEPRINT_OMEGA";
  memory.remember(agent, secret, true); // Sensitive!

  // Cek fisik file (harus terenkripsi / tidak terbaca plain)
  const rawFile = fs.readFileSync(TEST_FILE, "utf-8");
  if (rawFile.includes("BLUEPRINT_OMEGA")) {
    throw new Error("ENCRYPTION FAILED: Raw secret found in file!");
  }

  // Cek recall (harus ter-decrypt otomatis)
  const recall2 = memory.recall(agent);
  // recall2 akan berisi [compressed_hello, decrypted_secret]
  // Kita cari yang isinya secret
  const retrievedSecret = recall2.find(s => s === "BLUEPRINT_OMEGA");
  
  if (!retrievedSecret) {
    throw new Error(`DECRYPTION FAILED: Secret not found in recall results. Got: ${JSON.stringify(recall2)}`);
  }

  // Cleanup
  if (fs.existsSync(TEST_FILE)) fs.unlinkSync(TEST_FILE);
  console.log("MEMORY SECURITY & COMPRESSION TEST PASSED");
})();
