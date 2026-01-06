"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBrainCommand = handleBrainCommand;
const learningAuthority_1 = require("../learning/learningAuthority");
async function handleBrainCommand(input, ctx) {
    if (input === "allow-learn") {
        (0, learningAuthority_1.enableLearning)("human");
        return { status: "LEARNING_ENABLED" };
    }
    if (input.startsWith("learn ")) {
        return (0, learningAuthority_1.processLearning)(input.replace("learn ", ""), ctx.agent, ctx.session_id);
    }
    return { status: "IDLE" };
}
