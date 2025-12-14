import { AgentRole } from "./agentTypes";

export abstract class Agent {
  constructor(
    public readonly id: string,
    public readonly role: AgentRole
  ) {}

  abstract handle(input: string): Promise<string>;
}
