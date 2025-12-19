import { EventBus } from "../events/eventBus";

export class Translator {
  constructor(private bus: typeof EventBus = EventBus) {}

  translate(text: string) {
    this.bus.emit("TRANSLATE", { text });
    return text;
  }
}
