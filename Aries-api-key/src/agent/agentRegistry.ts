import { Agent } from "./agent";
import { AgentRole } from "./agentTypes";

export class AgentRegistry {
  private agents = new Map<string, Agent>();
  private children = new Map<string, string[]>();

  // 🔒 OVERLOADS
  register(agent: Agent): Agent;
  register(name: string, role: AgentRole, parentName?: string): Agent;

  register(
    arg1: string | Agent,
    role?: AgentRole,
    parentName?: string
  ): Agent {
    if (arg1 instanceof Agent) {
      this.agents.set(arg1.name, arg1);
      return arg1;
    }

    const agent = new Agent(arg1, role!);
    this.agents.set(arg1, agent);

    if (parentName) {
      const parent = this.agents.get(parentName);
      if (parent) {
        agent.setParent(parent);
        const list = this.children.get(parentName) || [];
        list.push(arg1);
        this.children.set(parentName, list);
      }
    }
    return agent;
  }

  // 🔒 REQUIRED BY DSL TEST
  attach(agent: Agent): void {
    this.agents.set(agent.name, agent);
  }

  get(name: string): Agent | undefined {
    return this.agents.get(name);
  }

  list(): Agent[] {
    return Array.from(this.agents.values());
  }

  async broadcast(command: string): Promise<string[]> {
    const results: string[] = [];
    for (const agent of this.agents.values()) {
      results.push(await agent.handle(command));
    }
    return results;
  }

  async delegate(parentName: string, command: string): Promise<string> {
    const children = this.children.get(parentName) || [];
    if (children.length === 0) {
      throw new Error("No delegated agents");
    }

    const child = this.agents.get(children[0]);
    if (!child) {
      throw new Error("Delegated agent not found");
    }

    return child.handleDelegated(command);
  }
}
