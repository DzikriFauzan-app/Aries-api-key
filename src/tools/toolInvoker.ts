import { ToolRegistry } from "./toolRegistry";
import { AgentPolicyBinder } from "../policy/agentPolicyBinder";
import { Agent } from "../agent/agent";

export class ToolInvoker {
  constructor(
    private registry: ToolRegistry,
    private policy: AgentPolicyBinder
  ) {}

  async invoke(
    agent: Agent,
    toolName: string,
    input: string
  ): Promise<string> {

    // POLICY CHECK (REAL)
    this.policy.enforce(agent, toolName);

    const tool = this.registry.get(toolName);
    if (!tool) {
      throw new Error(`TOOL NOT FOUND: ${toolName}`);
    }

    return tool.execute(input, {
      agent: agent.name,
      role: agent.role
    });
  }
}
