import { routeCommand } from "./router/commandRouter";
import { createDefaultMemory } from "./memory";

export async function run(input: string) {
  const memory = createDefaultMemory();
  return await routeCommand(input, memory);
}
