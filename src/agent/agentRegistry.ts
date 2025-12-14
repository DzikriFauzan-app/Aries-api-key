import { Agent } from "./agent";
import { AgentRole } from "./agentTypes";

export class AgentRegistry {
  private agents = new Map<string, Agent>();

  register(agent: Agent): Agent;
  register(name: string, role: AgentRole, parentName?: string): Agent;
  register(
    arg1: string | Agent,
    role?: AgentRole,
    parentName?: string
  ): Agent {
    let agent: Agent;

    if (arg1 instanceof Agent) {
      agent = arg1;
    } else {
      const parent = parentName ? this.agents.get(parentName) : undefined;
      agent = new Agent(arg1, role!, parent);
    }

    if (this.agents.has(agent.name)) {
      throw new Error(`Agent already exists: ${agent.name}`);
    }

    this.agents.set(agent.name, agent);
    return agent;
  }

  get(name: string): Agent {
    const agent = this.agents.get(name);
    if (!agent) throw new Error(`Agent not found: ${name}`);
    return agent;
  }

  list(): Agent[] {
    return Array.from(this.agents.values());
  }
}
