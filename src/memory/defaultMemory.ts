/* ARCHIVED LEGACY IMPLEMENTATION
   Original logic commented out to support Step 20 Architecture.
   Function signatures kept for backward compatibility.
*/

import { EventBus } from "../events/eventBus";
import { MemoryController } from "./memoryController";

// Stub implementation to satisfy TS export requirements
export function createDefaultMemory(bus?: any): any {
  console.warn("WARNING: Legacy createDefaultMemory called. Using Step 20 MemoryController stub.");
  
  // Return mock object or throw error, depending on usage.
  // Sesuai prinsip "Ganti Mesin", kita return MemoryController baru jika memungkinkan,
  // atau null jika contract-nya beda jauh.
  // Karena return type 'any' di legacy, kita aman return null atau object kosong.
  return new MemoryController(bus || new EventBus());
}
