import { Tool } from "./toolTypes";

export const EchoTool: Tool = {
  name: "ECHO",
  async execute(input: string): Promise<string> {
    return input;
  }
};
