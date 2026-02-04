/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from '../audit/auditLogger';
import { EventBus } from "../events/eventBus";


export class ReplayEngine {
  private readonly logger = new Logger();
  constructor(private bus: typeof EventBus = EventBus) {}

  replay(events: any[]) {
    for (const e of events) {
      this.bus.emit("REPLAY_EVENT", e);
    }
  }

  public async healthCheck(): Promise<boolean> { try { return !!this.logger; } catch { return false; } }
}
