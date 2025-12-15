import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { MemoryStore } from "./memoryStore";
import { enforceMemoryPolicy } from "./memoryPolicy";
import { MemoryPayload } from "./memoryTypes";
import { randomUUID } from "crypto";

export class MemoryController {
  private store = new MemoryStore();

  constructor(private bus: EventBus) {}

  start() {
    this.bus.subscribe("MEMORY_READ", async (evt: AriesEvent) => {
      this.handle(evt);
    });

    this.bus.subscribe("MEMORY_WRITE", async (evt: AriesEvent) => {
      this.handle(evt);
    });
  }

  private async handle(evt: AriesEvent) {
    const payload = evt.payload as MemoryPayload;

    try {
      // Enforce Policy menggunakan Correlation ID sebagai Session ID context
      enforceMemoryPolicy(payload, evt.correlationId!);

      let result;
      if (payload.action === "MEMORY_READ") {
        result = this.store.read(payload.key);
      }

      if (payload.action === "MEMORY_WRITE") {
        this.store.write(payload.key, payload.value);
        result = "OK";
      }

      await this.bus.publish({
        id: randomUUID(),
        type: "MEMORY_RESULT",
        source: "MEMORY",
        timestamp: Date.now(),
        correlationId: evt.correlationId,
        payload: { result }
      });
    } catch (err: any) {
      await this.bus.publish({
        id: randomUUID(),
        type: "MEMORY_DENIED",
        source: "MEMORY",
        timestamp: Date.now(),
        correlationId: evt.correlationId,
        payload: { error: err.message }
      });
    }
  }
}
