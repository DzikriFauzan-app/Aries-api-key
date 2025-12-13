"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandRouter_1 = require("../src/router/commandRouter");
async function run() {
    const write = await (0, commandRouter_1.routeCommand)("MEM_WRITE::fact1=Sky is blue");
    if (write !== "MEMORY_WRITE_OK") {
        throw new Error("MEMORY WRITE FAILED");
    }
    const read = await (0, commandRouter_1.routeCommand)("MEM_READ::fact1");
    if (read !== "Sky is blue") {
        throw new Error("MEMORY READ FAILED");
    }
    const emptyKey = await (0, commandRouter_1.routeCommand)("MEM_READ::");
    if (emptyKey !== "POLICY_DENY: EMPTY_MEMORY_KEY") {
        throw new Error("EMPTY KEY POLICY FAILED");
    }
    console.log("MEMORY SUBSYSTEM TEST PASSED");
}
run();
