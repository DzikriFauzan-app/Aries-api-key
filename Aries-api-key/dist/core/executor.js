"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGlobalHandlers = initGlobalHandlers;
const autoRepair_1 = require("../repair/autoRepair");
function initGlobalHandlers() {
    process.on("uncaughtException", (err) => {
        (0, autoRepair_1.reportBug)(err, "runtime");
    });
    process.on("unhandledRejection", (err) => {
        (0, autoRepair_1.reportBug)(err, "promise");
    });
}
