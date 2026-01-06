"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feacRequestLearn = feacRequestLearn;
exports.neoRequestAction = neoRequestAction;
const ariesBrain_1 = require("../brain/ariesBrain");
async function feacRequestLearn(data, ctx) {
    return (0, ariesBrain_1.ariesBrainExecute)(data, {
        caller: "feac",
        apiKey: ctx.apiKey,
        session_id: ctx.session_id,
        user_id: ctx.user_id
    });
}
async function neoRequestAction(command, ctx) {
    return (0, ariesBrain_1.ariesBrainExecute)(command, {
        caller: "neo",
        apiKey: ctx.apiKey,
        session_id: ctx.session_id,
        user_id: ctx.user_id
    });
}
