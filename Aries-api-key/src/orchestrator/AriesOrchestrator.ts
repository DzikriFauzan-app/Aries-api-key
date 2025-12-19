import { MemoryController } from "../memory/memoryController";
import { EventBus } from "../events/eventBus";
import { EventType } from "../events/eventTypes";

export class AriesOrchestrator {
  private memory: any;
  private bus: typeof EventBus;
  private reasoning: any;

  constructor(reasoningEngine: any) {
    // MemoryController butuh instance EventBus untuk audit kedaulatan
    this.memory = new MemoryController(EventBus.getInstance() as any);
    this.bus = EventBus;
    this.reasoning = reasoningEngine;
  }

  // Alias agar ariesBrain.ts bisa memanggil .dispatch()
  async dispatch(input: string, ctx: any) {
    return this.execute({ ...ctx, input });
  }

  async execute(ctx: any) {
    EventBus.emit(EventType.INTERNAL_UPDATE, { 
      status: "STARTING", 
      session: ctx.session_id 
    });
    
    const result = await this.reasoning.process(ctx.input);
    
    EventBus.emit(EventType.INTERNAL_UPDATE, { 
      status: "FINISHED", 
      result 
    });
    return result;
  }
}
