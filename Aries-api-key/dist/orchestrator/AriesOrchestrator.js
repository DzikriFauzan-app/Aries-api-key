"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriesOrchestrator = void 0;
const memoryController_1 = require("../memory/memoryController");
const eventBus_1 = require("../events/eventBus");
const eventTypes_1 = require("../events/eventTypes");
class AriesOrchestrator {
    constructor(reasoningEngine) {
        // MemoryController butuh instance EventBus untuk audit kedaulatan
        this.memory = new memoryController_1.MemoryController(eventBus_1.EventBus.getInstance());
        this.bus = eventBus_1.EventBus;
        this.reasoning = reasoningEngine;
    }
    // Alias agar ariesBrain.ts bisa memanggil .dispatch()
    async dispatch(input, ctx) {
        return this.execute({ ...ctx, input });
    }
    async execute(ctx) {
        eventBus_1.EventBus.emit(eventTypes_1.EventType.INTERNAL_UPDATE, {
            status: "STARTING",
            session: ctx.session_id
        });
        const result = await this.reasoning.process(ctx.input);
        eventBus_1.EventBus.emit(eventTypes_1.EventType.INTERNAL_UPDATE, {
            status: "FINISHED",
            result
        });
        return result;
    }
}
exports.AriesOrchestrator = AriesOrchestrator;
