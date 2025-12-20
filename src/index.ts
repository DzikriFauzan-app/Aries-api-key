import { dispatchCommand } from "./router/routeCommand";
import { MemoryController } from "./memory/memoryController";

export async function run(input: string) {
  const memory = new MemoryController();
  return await dispatchCommand({ input, memory, bus: null });
}
