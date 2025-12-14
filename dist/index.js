"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = run;
const commandRouter_1 = require("./router/commandRouter");
const memory_1 = require("./memory");
async function run(input) {
    const memory = (0, memory_1.createDefaultMemory)();
    return await (0, commandRouter_1.routeCommand)(input, memory);
}
