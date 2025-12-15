"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryController = void 0;
const memoryTransformer_1 = require("./memoryTransformer");
class MemoryController {
    constructor(store, policy, audit) {
        this.store = store;
        this.policy = policy;
        this.audit = audit;
    }
    remember(agent, content, isSensitive = false) {
        this.policy.enforce(agent, "MEMORY_WRITE");
        const now = Date.now();
        const uniqueId = Math.floor(Math.random() * 1000000);
        const key = `${agent.name}:${now}:${uniqueId}`;
        // 1. Compress (Selalu, untuk efisiensi)
        let processedContent = memoryTransformer_1.MemoryTransformer.compress(content);
        // 2. Encrypt (Jika sensitif/blueprint)
        if (isSensitive) {
            processedContent = memoryTransformer_1.MemoryTransformer.encrypt(processedContent);
        }
        const rec = {
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
    recall(agent) {
        this.policy.enforce(agent, "MEMORY_READ");
        const storeAny = this.store;
        let records = [];
        if (storeAny.snapshot) {
            records = storeAny.snapshot();
        }
        else if (storeAny.scan) {
            records = storeAny.scan().map((k) => storeAny.read(k));
        }
        const filtered = records.filter((r) => {
            if (!r)
                return false;
            const byProp = r.agent === agent.name;
            const byKey = (typeof r.key === 'string') && r.key.startsWith(`${agent.name}:`);
            return byProp || byKey;
        });
        // Update stats
        const now = Date.now();
        filtered.forEach(r => {
            if (typeof r.hits === 'number')
                r.hits++;
            r.lastAccess = now;
        });
        // Sort & Decode
        return filtered
            .sort((a, b) => a.ts - b.ts)
            .map(r => {
            let val = r.content || r.value;
            // Auto Decrypt jika flag nyala
            if (r.encrypted && typeof val === 'string') {
                return memoryTransformer_1.MemoryTransformer.decrypt(val);
            }
            return val;
        })
            .filter(c => typeof c === 'string');
    }
    // Pruning logic tetap sama (sudah solid)
    prune(limit) {
        const storeAny = this.store;
        if (!storeAny.snapshot || !storeAny.replace)
            return;
        const now = Date.now();
        const all = storeAny.snapshot();
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
exports.MemoryController = MemoryController;
