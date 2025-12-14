import { AgentRole, ROLE_PERMISSIONS } from "./agentTypes";

export class Agent {
  readonly name: string;
  readonly role: AgentRole;
  readonly parent?: Agent;

  constructor(name: string, role: AgentRole, parent?: Agent) {
    this.name = name;
    this.role = role;
    this.parent = parent;
  }

  canApprove(): boolean {
    return ROLE_PERMISSIONS[this.role].canApprove;
  }

  canExecute(): boolean {
    return ROLE_PERMISSIONS[this.role].canExecute;
  }

  approve(): boolean {
    if (this.canApprove()) return true;
    if (!this.parent) return false;
    return this.parent.approve();
  }

  async handle(command: string): Promise<any> {
    if (!this.canExecute()) {
      return { status: "DENIED", agent: this.name };
    }
    if (command.toLowerCase() === "ping") return "PONG";
    return { status: "UNKNOWN", command };
  }
}
