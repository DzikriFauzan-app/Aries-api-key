import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { randomUUID } from "crypto";

export class FeacLoop {
  constructor(private bus: EventBus) {}

  start() {
    this.bus.subscribe("TASK_ASSIGNED", async (evt) => {
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
