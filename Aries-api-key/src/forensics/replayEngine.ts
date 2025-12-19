import { EventBus } from "../events/eventBus";

export class ReplayEngine {
  constructor(private bus: typeof EventBus = EventBus) {}

  replay(events: any[]) {
    for (const e of events) {
      this.bus.emit("REPLAY_EVENT", e);
    }
  }
}
