"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportBug = reportBug;
const eventBus_1 = require("../events/eventBus");
const eventTypes_1 = require("../events/eventTypes");
function reportBug(error, source) {
    (0, eventBus_1.emitEvent)(eventTypes_1.EventType.BUG_REPORTED, {
        error: error?.message || String(error),
        source
    });
    return autoRepair(error, source);
}
function autoRepair(error, source) {
    (0, eventBus_1.emitEvent)(eventTypes_1.EventType.AUTO_REPAIR_TRIGGERED, {
        from: source,
        fix: "initiated",
        severity: "runtime"
    });
    return { status: "REPAIR_EXECUTED" };
}
