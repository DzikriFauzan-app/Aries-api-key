"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemoryController = void 0;
const memoryStore_1 = require("./memoryStore");
const memoryPolicy_1 = require("./memoryPolicy");
const crypto_1 = require("crypto");
class MemoryController {
    constructor(bus) {
        this.bus = bus;
        this.store = new memoryStore_1.MemoryStore();
    }
    start() {
        this.bus.subscribe("MEMORY_READ", async (evt) => {
            this.handle(evt);
        });
        this.bus.subscribe("MEMORY_WRITE", async (evt) => {
            this.handle(evt);
        });
    }
    async handle(evt) {
        const payload = evt.payload;
        try {
            // Enforce Policy menggunakan Correlation ID sebagai Session ID context
            (0, memoryPolicy_1.enforceMemoryPolicy)(payload, evt.correlationId);
            let result;
            if (payload.action === "MEMORY_READ") {
                result = this.store.read(payload.key);
            }
            if (payload.action === "MEMORY_WRITE") {
                this.store.write(payload.key, payload.value);
                result = "OK";
            }
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "MEMORY_RESULT",
                source: "MEMORY",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: { result }
            });
        }
        catch (err) {
            await this.bus.publish({
                id: (0, crypto_1.randomUUID)(),
                type: "MEMORY_DENIED",
                source: "MEMORY",
                timestamp: Date.now(),
                correlationId: evt.correlationId,
                payload: { error: err.message }
            });
        }
    }
}
exports.MemoryController = MemoryController;
