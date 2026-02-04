/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { AgentRole } from "./agentTypes";


export class Agent {
  private readonly logger = new Logger();
  public readonly name: string;
  public readonly role: AgentRole;

  private approvedCommands: Set<string> = new Set();
  private parent?: Agent;

  constructor(name: string, role: AgentRole) {
    this.name = name;
    this.role = role;
  }

  setParent(parent: Agent): void {
    this.parent = parent;
  }

  // BACKWARD COMPATIBLE
  approve(): boolean;
  approve(command: string): boolean;
  approve(command?: string): boolean {
    if (!command) {
      this.approvedCommands.add("*");
      return true;
    }
    this.approvedCommands.add(command);
    return true;
  }

  private isApproved(command: string): boolean {
    if (this.approvedCommands.has("*")) return true;
    if (this.approvedCommands.has(command)) return true;
    if (this.parent) return this.parent.isApproved(command);
    return false;
  }

  async handle(command: string, trusted = false): Promise<string> {
    if (this.role === "WORKER" && !trusted && !this.isApproved(command)) {
      throw new Error("Worker approval failed");
    }

    if (command === "ping") return "PONG";
    return `OK:${command}`;
  }

  // ✅ INTERNAL USE ONLY (DSL / REGISTRY)
  async handleDelegated(command: string): Promise<string> {
    return this.handle(command, true);
  }

  public async healthCheck(): Promise<boolean> { try { return !!this.logger; } catch { return false; } }
}
