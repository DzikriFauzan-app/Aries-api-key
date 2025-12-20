import { enforceMemoryPolicy } from "./memoryGovernor";

export class MemoryController {
  private store: any[] = [];

  write(plan: any, payload: any) {
    enforceMemoryPolicy(plan, "WRITE", this.store.length);
    this.store.push(payload);
  }

  read() {
    return this.store;
  }

  size() {
    return this.store.length;
  }
}
