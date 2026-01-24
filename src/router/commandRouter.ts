import { MemoryController } from "../memory";
import { routeCommandInternal } from "./routeCommandInternal";

export async function routeCommand(
  input: any,
  memory: MemoryController
) {
  return routeCommandInternal(input, memory);
}
