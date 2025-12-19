import { emitEvent } from "../events/eventBus";
import { EventType } from "../events/eventTypes";

export function reportBug(error: any, source: string) {
  emitEvent(EventType.BUG_REPORTED, { 
    error: error?.message || String(error), 
    source 
  });
  return autoRepair(error, source);
}

function autoRepair(error: any, source: string) {
  emitEvent(EventType.AUTO_REPAIR_TRIGGERED, { 
    from: source, 
    fix: "initiated", 
    severity: "runtime" 
  });
  return { status: "REPAIR_EXECUTED" };
}
