import { EventBus } from "../events/eventBus";

export class Gateway {
  constructor(private bus: typeof EventBus = EventBus) {
    this.bus.subscribe("AGENT_RESPONSE", async (event: {
      type: string;
      payload: any;
      timestamp: number;
    }) => {
      // response routing handled here
    });
  }
}
