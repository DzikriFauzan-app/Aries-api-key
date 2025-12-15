import { Tool, ToolConstructor } from "./toolTypes";

export class ToolRegistry {
  private tools = new Map<string, Tool>();

  register(ToolClass: ToolConstructor): void {
    const tool = new ToolClass();
    this.tools.set(tool.toolName, tool);
  }

  get(name: string): Tool | undefined {
    return this.tools.get(name);
  }

  list(): Tool[] {
    return Array.from(this.tools.values());
  }
}
