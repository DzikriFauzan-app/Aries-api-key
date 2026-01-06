"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCommand = routeCommand;
async function routeCommand(input, memory, agent) {
    if (agent && !agent.approve()) {
        return { status: "DENIED", reason: "Approval chain failed" };
    }
    if (input === "PING") {
        return "PONG";
    }
    return { status: "UNKNOWN_COMMAND", input };
}
