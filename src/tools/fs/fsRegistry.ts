import { FsToolDefinition, FsToolName } from "./fsTypes";

const registry = new Map<FsToolName, FsToolDefinition>();

export function registerFsTool(def: FsToolDefinition) {
  if (registry.has(def.name)) {
    throw new Error("Tool already registered: " + def.name);
  }
  registry.set(def.name, def);
}

export function getFsTool(name: FsToolName): FsToolDefinition {
  const tool = registry.get(name);
  if (!tool) {
    throw new Error("FS Tool not registered: " + name);
  }
  return tool;
}

export function listFsTools(): FsToolDefinition[] {
  return Array.from(registry.values());
}
