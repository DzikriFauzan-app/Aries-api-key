import { EventBus } from "../events/eventBus";

export class ReasoningOrchestrator {
  constructor(private bus: typeof EventBus = EventBus) {}

  think(input: string) {
    this.bus.emit("REASONING_STEP", { input });
  }
}
