import { MemoryStore } from "./memoryStore";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { AuditLogger } from "../audit/auditLogger";
import { Agent } from "../agent/agent";

export class MemoryController {
  constructor(
    private store: MemoryStore,
    private policy: AgentPolicyBinder,
    private audit: AuditLogger
  ) {}

  remember(agent: Agent, content: string): void {
    this.policy.enforce(agent, "MEMORY_WRITE");

    this.store.write({
      key: `${agent.name}:${Date.now()}`,
      agent: agent.name,
      role: agent.role,
      content,
      ts: Date.now()
    });

    this.audit.log({
      ts: Date.now(),
      type: "AGENT_COMMAND",
      agent: agent.name,
      role: agent.role,
      action: "MEMORY_WRITE",
      detail: content
    });
  }

  recall(agent: Agent): string[] {
    this.policy.enforce(agent, "MEMORY_READ");

    return this.store
      .readByAgent(agent.name)
      .map(r => r.content)
      .filter((c): c is string => typeof c === "string");
  }
}
