"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commandRouter_1 = require("../router/commandRouter");
const memory_1 = require("../memory");
async function run() {
    const mem = (0, memory_1.createDefaultMemory)();
    const res = await (0, commandRouter_1.routeCommand)("PING", mem);
    if (res !== "PONG")
        throw new Error("PING FAILED");
    console.log("COMMAND ROUTER TEST PASSED");
}
run();
