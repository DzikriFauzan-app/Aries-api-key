"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feacLoop = feacLoop;
const ariesBrain_1 = require("../brain/ariesBrain");
async function feacLoop(input) {
    return (0, ariesBrain_1.ariesBrainExecute)(input, {
        caller: "feac",
        session_id: "FEAC_SESSION",
        user_id: "FEAC_SYSTEM"
    });
}
