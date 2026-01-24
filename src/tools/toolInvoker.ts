import { ToolRegistry } from "./toolRegistry";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { Agent } from "../agent/agent";
import { AuditLogger } from "../audit/auditLogger";

export class ToolInvoker {
  constructor(
    private registry: ToolRegistry,
    private policy: AgentPolicyBinder,
    private audit: AuditLogger
  ) {}

  async invoke(
    agent: Agent,
    toolName: string,
    input: string
  ): Promise<string> {

    this.policy.enforce(agent, toolName);

    const tool = this.registry.get(toolName);
    if (!tool) {
      throw new Error(`TOOL NOT FOUND: ${toolName}`);
    }

    const result = await tool.execute(input, {
      agent: agent.name,
      role: agent.role
    });

    this.audit.log({
      ts: Date.now(),
      type: "TOOL_INVOKE",
      agent: agent.name,
      role: agent.role,
      action: toolName,
      detail: input
    });

    return result;
  }
}
