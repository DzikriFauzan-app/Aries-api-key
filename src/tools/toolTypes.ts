export interface ToolContext {
  agent: string;
  role: string;
}

export interface Tool {
  readonly toolName: string;
  execute(input: string, ctx: ToolContext): Promise<string>;
}

export type ToolConstructor = new () => Tool;
