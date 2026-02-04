/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { MemoryController } from "./memoryController";
import { EventBus } from "../events/eventBus";


export function createDefaultMemory(bus: typeof EventBus = EventBus) {
  return new MemoryController(bus);
}
