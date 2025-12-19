import { EventBus } from "../events/eventBus";

export class BenchmarkRunner {
  private bus: typeof EventBus;

  constructor() {
    this.bus = EventBus;
  }

  run() {
    this.bus.emit("BENCHMARK_RUN", { at: Date.now() });
  }
}
