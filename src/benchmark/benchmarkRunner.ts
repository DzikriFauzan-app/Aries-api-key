import { MemoryController } from "../memory/memoryController";

export class BenchmarkRunner {
  memory: MemoryController;

  constructor() {
    this.memory = new MemoryController();
  }

  run(count: number) {
    for (let i = 0; i < count; i++) {
      this.memory.write("ENTERPRISE", { i });
    }
    return this.memory.size();
  }
}
