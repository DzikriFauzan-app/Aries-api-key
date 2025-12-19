import { EventType } from "./eventTypes";

export class EventBus {
  private static instance: EventBus;
  private listeners: Map<string, Function[]> = new Map();

  static getInstance() {
    if (!EventBus.instance) EventBus.instance = new EventBus();
    return EventBus.instance;
  }

  // Support format: emit("TYPE", {data}) ATAU emit({type: "TYPE", payload: {data}})
  static emit(typeOrObj: any, payload?: any) {
    const bus = EventBus.getInstance();
    if (typeof typeOrObj === 'object' && typeOrObj.type) {
      bus.actualEmit(String(typeOrObj.type), typeOrObj.payload || typeOrObj);
    } else {
      bus.actualEmit(String(typeOrObj), payload);
    }
  }

  static subscribe(type: string, callback: Function) {
    EventBus.getInstance().on(type, callback);
  }

  private actualEmit(type: string, data: any) {
    const callbacks = this.listeners.get(type) || [];
    callbacks.forEach(cb => cb(data));
  }

  on(type: string, callback: Function) {
    if (!this.listeners.has(type)) this.listeners.set(type, []);
    this.listeners.get(type)?.push(callback);
  }
}

// Global wrapper untuk Step 5 Anda
export function emitEvent(typeOrObj: any, payload?: any) {
  EventBus.emit(typeOrObj, payload);
}
