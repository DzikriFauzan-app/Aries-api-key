import { MemoryStore } from "./memoryStore";
import { Agent } from "../agent/agent";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { AuditLogger } from "../audit/auditLogger";
import { MemoryTransformer } from "./memoryTransformer";

export class MemoryController {
  constructor(
    private store: MemoryStore,
    private policy: AgentPolicyBinder,
    private audit: AuditLogger
  ) {}

  remember(agent: Agent, content: string, isSensitive: boolean = false): void {
    this.policy.enforce(agent, "MEMORY_WRITE");

    const now = Date.now();
    const uniqueId = Math.floor(Math.random() * 1000000);
    const key = `${agent.name}:${now}:${uniqueId}`;

    // 1. Compress (Selalu, untuk efisiensi)
    let processedContent = MemoryTransformer.compress(content);
    
    // 2. Encrypt (Jika sensitif/blueprint)
    if (isSensitive) {
      processedContent = MemoryTransformer.encrypt(processedContent);
    }

    const rec: any = {
      key: key,
      agent: agent.name,
      role: agent.role,
      content: processedContent,
      value: processedContent,
      ts: now,
      score: isSensitive ? 500 : 100, // Data sensitif score lebih tinggi (lebih tahan prune)
      hits: 0,
      lastAccess: now,
      encrypted: isSensitive // Metadata penting!
    };

    this.store.write(rec);

    this.audit.log({
      ts: now,
      type: "AGENT_COMMAND",
      agent: agent.name,
      role: agent.role,
      action: "MEMORY_WRITE",
      detail: isSensitive ? "ENCRYPTED_DATA" : "PLAIN_DATA"
    });
  }

  recall(agent: Agent): string[] {
    this.policy.enforce(agent, "MEMORY_READ");

    const storeAny = this.store as any;
    let records: any[] = [];
    
    if (storeAny.snapshot) {
      records = storeAny.snapshot();
    } else if (storeAny.scan) {
      records = storeAny.scan().map((k: string) => storeAny.read(k));
    }

    const filtered = records.filter((r: any) => {
      if (!r) return false;
      const byProp = r.agent === agent.name;
      const byKey = (typeof r.key === 'string') && r.key.startsWith(`${agent.name}:`);
      return byProp || byKey;
    });

    // Update stats
    const now = Date.now();
    filtered.forEach(r => {
      if (typeof r.hits === 'number') r.hits++;
      r.lastAccess = now;
    });

    // Sort & Decode
    return filtered
      .sort((a, b) => a.ts - b.ts)
      .map(r => {
        let val = r.content || r.value;
        // Auto Decrypt jika flag nyala
        if (r.encrypted && typeof val === 'string') {
          return MemoryTransformer.decrypt(val);
        }
        return val;
      })
      .filter(c => typeof c === 'string');
  }

  // Pruning logic tetap sama (sudah solid)
  prune(limit: number): void {
    const storeAny = this.store as any;
    if (!storeAny.snapshot || !storeAny.replace) return;

    const now = Date.now();
    const all: any[] = storeAny.snapshot();

    const retained = all
      .map(r => {
        const age = now - (r.lastAccess || 0);
        const recencyScore = 1000000 / (age + 1);
        const finalScore = (r.hits || 0) * 10 + recencyScore + (r.score || 0); // Include base score
        return { r, score: finalScore };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(x => x.r);

    storeAny.replace(retained);
    
    this.audit.log({
      ts: now,
      type: "AGENT_COMMAND",
      agent: "SYSTEM",
      role: "KERNEL",
      action: "PRUNE",
      detail: `Pruned system memory`
    });
  }
}
