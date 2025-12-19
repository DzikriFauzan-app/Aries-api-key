import { PermissionRule } from "./permissionTypes";

export class PermissionMatrix {
  private rules: PermissionRule[] = [];

  register(rule: PermissionRule): void {
    this.rules.push(rule);
  }

  isAllowed(
    agent: string,
    role: string,
    command: string
  ): boolean {
    return this.rules.some(r =>
      r.agent === agent &&
      r.role === role &&
      r.allow.includes(command)
    );
  }
}
