"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.internalExecute = internalExecute;
const executor_1 = require("./executor");
const eventBus_1 = require("../events/eventBus");
async function internalExecute(input) {
    const executor = new executor_1.Executor();
    const result = await executor.run(input);
    eventBus_1.EventBus.emit("INTERNAL_EXECUTE", { input, result });
    return result;
}
