"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerFsTool = registerFsTool;
exports.getFsTool = getFsTool;
exports.listFsTools = listFsTools;
const registry = new Map();
function registerFsTool(def) {
    if (registry.has(def.name)) {
        throw new Error("Tool already registered: " + def.name);
    }
    registry.set(def.name, def);
}
function getFsTool(name) {
    const tool = registry.get(name);
    if (!tool) {
        throw new Error("FS Tool not registered: " + name);
    }
    return tool;
}
function listFsTools() {
    return Array.from(registry.values());
}
