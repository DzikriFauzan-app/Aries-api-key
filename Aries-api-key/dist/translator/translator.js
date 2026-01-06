"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Translator = void 0;
const eventBus_1 = require("../events/eventBus");
class Translator {
    constructor(bus = eventBus_1.EventBus) {
        this.bus = bus;
    }
    translate(text) {
        this.bus.emit("TRANSLATE", { text });
        return text;
    }
}
exports.Translator = Translator;
