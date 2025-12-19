import { Executor } from "./executor";
import { EventBus } from "../events/eventBus";

export async function internalExecute(input: string) {
  const executor = new Executor();
  const result = await executor.run(input);

  EventBus.emit("INTERNAL_EXECUTE", { input, result });
  return result;
}
