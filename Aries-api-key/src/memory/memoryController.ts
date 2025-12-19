import { EventBus } from "../events/eventBus";

export class MemoryController {
  constructor(private bus: typeof EventBus = EventBus) {}

  remember(key: string, value: any) {
    this.bus.emit("MEMORY_WRITE", { key, value });
  }
}

export function tenantMemoryKey(ns: string, key: string) {
  return `${ns}:${key}`;
}
