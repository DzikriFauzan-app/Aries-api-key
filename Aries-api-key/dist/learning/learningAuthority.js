"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLearning = enableLearning;
exports.processLearning = processLearning;
const memoryController_1 = require("../memory/memoryController");
const eventBus_1 = require("../events/eventBus");
const eventBus_2 = require("../events/eventBus");
const eventTypes_1 = require("../events/eventTypes");
const vectorStore_1 = require("../memory/vector/vectorStore");
const memory = new memoryController_1.MemoryController(eventBus_2.EventBus.getInstance());
let learningEnabled = false;
function enableLearning(by) {
    learningEnabled = true;
    (0, eventBus_1.emitEvent)({
        type: eventTypes_1.EventType.LEARNING_ENABLED,
        source: "aries",
        payload: { by }
    });
}
function processLearning(input, agent, session) {
    if (!learningEnabled) {
        throw new Error("LEARNING_NOT_AUTHORIZED");
    }
    memory.remember(session, input);
    (0, vectorStore_1.storeVector)(session, input);
    (0, eventBus_1.emitEvent)({
        type: eventTypes_1.EventType.LEARNING_COMMITTED,
        source: agent,
        payload: { session, input }
    });
    return { status: "LEARNED" };
}
