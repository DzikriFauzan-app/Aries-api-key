import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { randomUUID } from "crypto";

export class FeacLoop {
  constructor(private bus: EventBus) {}

  start() {
    // FIX: Type annotation
    this.bus.subscribe("TASK_ASSIGNED", async (evt: AriesEvent) => {
      await this.bus.publish({
        id: randomUUID(),
        type: "TASK_APPROVED",
        source: "FEAC",
        timestamp: Date.now(),
        correlationId: evt.correlationId,
        payload: evt.payload
      });
    });
  }
}
