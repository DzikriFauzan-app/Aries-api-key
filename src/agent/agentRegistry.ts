import { Agent } from "./agent";

export class AgentRegistry {
  private agents = new Map<string, Agent>();

  register(agent: Agent): void {
    this.agents.set(agent.id, agent);
  }

  get(id: string): Agent | undefined {
    return this.agents.get(id);
  }

  list(): string[] {
    return Array.from(this.agents.keys());
  }
}
