import { MemoryStore } from "./memoryStore";
import { Agent } from "../agent/agent";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { AuditLogger } from "../audit/auditLogger";

export class MemoryController {
  constructor(
    private store: MemoryStore,
    private policy: AgentPolicyBinder,
    private audit: AuditLogger
  ) {}

  remember(agent: Agent, content: string): void {
    this.policy.enforce(agent, "MEMORY_WRITE");

    const now = Date.now();
    // UNIQUE KEY: AgentName + Timestamp + Random 
    // Mencegah overwrite saat test berjalan dalam <1ms
    const uniqueId = Math.floor(Math.random() * 1000000); 
    const key = `${agent.name}:${now}:${uniqueId}`;

    const rec: any = {
      key: key,
      agent: agent.name,
      role: agent.role,
      content: content,  // Core content
      value: content,    // Compat
      ts: now,
      score: 100,        // High default score (Important!)
      hits: 0,
      lastAccess: now
    };

    this.store.write(rec);

    this.audit.log({
      ts: now,
      type: "AGENT_COMMAND",
      agent: agent.name,
      role: agent.role,
      action: "MEMORY_WRITE",
      detail: content
    });
  }

  recall(agent: Agent): string[] {
    this.policy.enforce(agent, "MEMORY_READ");

    const storeAny = this.store as any;
    let records: any[] = [];
    
    // Ambil semua data (Snapshot)
    if (storeAny.snapshot) {
      records = storeAny.snapshot();
    } else if (storeAny.scan) {
      // Fallback untuk backend tipe lain
      records = storeAny.scan().map((k: string) => storeAny.read(k));
    }

    // FILTER KUAT (Anti-Lupa)
    // 1. Cek properti .agent
    // 2. ATAU Cek awalan Key (jika properti agent hilang di JSON)
    const filtered = records.filter((r: any) => {
      if (!r) return false;
      const byProp = r.agent === agent.name;
      const byKey = (typeof r.key === 'string') && r.key.startsWith(`${agent.name}:`);
      return byProp || byKey;
    });

    // Update Access Stats
    const now = Date.now();
    filtered.forEach(r => {
      if (typeof r.hits === 'number') r.hits++;
      r.lastAccess = now;
    });

    // Return Content sorted by Time
    return filtered
      .sort((a, b) => a.ts - b.ts)
      .map(r => r.content || r.value) // Prioritas content
      .filter(c => typeof c === 'string');
  }

  prune(limit: number): void {
    const storeAny = this.store as any;
    if (!storeAny.snapshot || !storeAny.replace) return;

    // SCORING LOGIC (Sesuai Filosofi: Keep Latest & Most Used)
    // Score = (Hits * 2) + (RecencyWeight) + BaseScore
    const now = Date.now();
    const all: any[] = storeAny.snapshot();

    const retained = all
      .map(r => {
        const age = now - (r.lastAccess || 0);
        // Semakin baru (age kecil), score makin tinggi
        const recencyScore = 1000000 / (age + 1); 
        const finalScore = (r.hits || 0) * 10 + recencyScore;
        return { r, score: finalScore };
      })
      .sort((a, b) => b.score - a.score) // Sort Tertinggi ke Terendah
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
