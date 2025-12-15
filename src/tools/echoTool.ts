import { Tool, ToolContext } from "./toolTypes";

export class EchoTool implements Tool {
  readonly toolName = "ECHO";

  async execute(input: string, _ctx: ToolContext): Promise<string> {
    return input;
  }
}
