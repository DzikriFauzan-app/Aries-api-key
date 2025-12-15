"use strict";
/* ARCHIVED LEGACY IMPLEMENTATION
   Original logic commented out to support Step 20 Architecture.
   Function signatures kept for backward compatibility.
*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDefaultMemory = createDefaultMemory;
const eventBus_1 = require("../events/eventBus");
const memoryController_1 = require("./memoryController");
// Stub implementation to satisfy TS export requirements
function createDefaultMemory(bus) {
    console.warn("WARNING: Legacy createDefaultMemory called. Using Step 20 MemoryController stub.");
    // Return mock object or throw error, depending on usage.
    // Sesuai prinsip "Ganti Mesin", kita return MemoryController baru jika memungkinkan,
    // atau null jika contract-nya beda jauh.
    // Karena return type 'any' di legacy, kita aman return null atau object kosong.
    return new memoryController_1.MemoryController(bus || new eventBus_1.EventBus());
}
