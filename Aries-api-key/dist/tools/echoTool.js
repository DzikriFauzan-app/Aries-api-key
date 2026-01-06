"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EchoTool = void 0;
class EchoTool {
    constructor() {
        this.toolName = "ECHO";
    }
    async execute(input, _ctx) {
        return input;
    }
}
exports.EchoTool = EchoTool;
