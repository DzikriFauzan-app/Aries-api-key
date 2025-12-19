import { MemoryController } from "../memory/memoryController";
import { emitEvent } from "../events/eventBus";
import { EventBus } from "../events/eventBus";
import { EventType } from "../events/eventTypes";
import { storeVector } from "../memory/vector/vectorStore";

const memory = new MemoryController(EventBus.getInstance() as any);

let learningEnabled = false;

export function enableLearning(by: string) {
  learningEnabled = true;
  emitEvent({
    type: EventType.LEARNING_ENABLED,
    source: "aries",
    payload: { by }
  });
}

export function processLearning(
  input: string,
  agent: string,
  session: string
) {
  if (!learningEnabled) {
    throw new Error("LEARNING_NOT_AUTHORIZED");
  }

  memory.remember(session, input);
  storeVector(session, input);

  emitEvent({
    type: EventType.LEARNING_COMMITTED,
    source: agent,
    payload: { session, input }
  });

  return { status: "LEARNED" };
}
