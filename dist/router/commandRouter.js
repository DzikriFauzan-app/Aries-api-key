"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routeCommand = routeCommand;
const routeCommandInternal_1 = require("./routeCommandInternal");
async function routeCommand(input, memory) {
    return (0, routeCommandInternal_1.routeCommandInternal)(input, memory);
}
