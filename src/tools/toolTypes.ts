export type ToolName = string;

export interface ToolContext {
  agent: string;
  role: string;
}

export interface Tool {
  name: ToolName;
  execute(input: string, ctx: ToolContext): Promise<string>;
}
