import { PermissionMatrix } from "./permissionMatrix";
import { Agent } from "../agent/agent";
import { AuditLogger } from "../audit/auditLogger";

export class AgentPolicyBinder {
  constructor(
    private matrix: PermissionMatrix,
    private audit: AuditLogger
  ) {}

  enforce(agent: Agent, command: string): void {
    const allowed = this.matrix.isAllowed(
      agent.name,
      agent.role,
      command
    );

    if (!allowed) {
      this.audit.log({
        ts: Date.now(),
        type: "POLICY_DENY",
        agent: agent.name,
        role: agent.role,
        action: command
      });
      throw new Error("POLICY DENIED");
    }
  }
}
