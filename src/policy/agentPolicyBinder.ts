import { PermissionMatrix } from "./permissionMatrix";
import { Agent } from "../agent/agent";

export class AgentPolicyBinder {
  constructor(private matrix: PermissionMatrix) {}

  enforce(agent: Agent, command: string): void {
    const ok = this.matrix.isAllowed(
      agent.name,
      agent.role,
      command
    );

    if (!ok) {
      throw new Error(
        `POLICY DENIED: ${agent.name} (${agent.role}) -> ${command}`
      );
    }
  }
}
