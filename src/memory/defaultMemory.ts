import { MemoryStore } from "./memoryStore";
import { FileMemoryBackend } from "./fileMemoryBackend";

export function createDefaultMemory(): MemoryStore {
  return new MemoryStore(
    new FileMemoryBackend(".aries_memory.json")
  );
}
