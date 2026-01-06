"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatchCommand = dispatchCommand;
async function dispatchCommand({ input, memory, bus }) {
    // Logic dispatcher sederhana untuk sinkronisasi engine
    if (input === "ping")
        return "pong";
    // Catat ke memori lewat Governance (Step 15)
    memory.write("ENTERPRISE", { task: input, timestamp: Date.now() });
    return `Processed: ${input}`;
}
