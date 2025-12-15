"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ToolRegistry = void 0;
class ToolRegistry {
    constructor() {
        this.tools = new Map();
    }
    register(ToolClass) {
        const tool = new ToolClass();
        this.tools.set(tool.toolName, tool);
    }
    get(name) {
        return this.tools.get(name);
    }
    list() {
        return Array.from(this.tools.values());
    }
}
exports.ToolRegistry = ToolRegistry;
