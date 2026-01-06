"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AriesBrain = void 0;
exports.ariesBrainExecute = ariesBrainExecute;
const AriesOrchestrator_1 = require("../orchestrator/AriesOrchestrator");
/**
 * CORE CLASS (NEW)
 */
class AriesBrain {
    constructor() {
        this.orchestrator = new AriesOrchestrator_1.AriesOrchestrator({
            process: async (input) => {
                return { output: `[ARIES] ${input}` };
            }
        });
    }
    async process(ctx) {
        return this.orchestrator.dispatch(ctx.input, ctx);
    }
}
exports.AriesBrain = AriesBrain;
/**
 * LEGACY COMPATIBILITY LAYER
 * WAJIB untuk FEAC / HTTP / ORCHESTRATOR lama
 */
const singletonBrain = new AriesBrain();
async function ariesBrainExecute(input, ctx = {}) {
    return singletonBrain.process({ input, ...ctx });
}
