"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBus = void 0;
exports.emitEvent = emitEvent;
class EventBus {
    constructor() {
        this.listeners = new Map();
    }
    static getInstance() {
        if (!EventBus.instance)
            EventBus.instance = new EventBus();
        return EventBus.instance;
    }
    // Support format: emit("TYPE", {data}) ATAU emit({type: "TYPE", payload: {data}})
    static emit(typeOrObj, payload) {
        const bus = EventBus.getInstance();
        if (typeof typeOrObj === 'object' && typeOrObj.type) {
            bus.actualEmit(String(typeOrObj.type), typeOrObj.payload || typeOrObj);
        }
        else {
            bus.actualEmit(String(typeOrObj), payload);
        }
    }
    static subscribe(type, callback) {
        EventBus.getInstance().on(type, callback);
    }
    actualEmit(type, data) {
        const callbacks = this.listeners.get(type) || [];
        callbacks.forEach(cb => cb(data));
    }
    on(type, callback) {
        if (!this.listeners.has(type))
            this.listeners.set(type, []);
        this.listeners.get(type)?.push(callback);
    }
}
exports.EventBus = EventBus;
// Global wrapper untuk Step 5 Anda
function emitEvent(typeOrObj, payload) {
    EventBus.emit(typeOrObj, payload);
}
