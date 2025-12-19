import { AriesOrchestrator } from "../orchestrator/AriesOrchestrator";

/**
 * CORE CLASS (NEW)
 */
export class AriesBrain {
  private orchestrator: AriesOrchestrator;

  constructor() {
    this.orchestrator = new AriesOrchestrator({
      process: async (input: string) => {
        return { output: `[ARIES] ${input}` };
      }
    });
  }

  async process(ctx: any) {
    return this.orchestrator.dispatch(ctx.input, ctx);
  }
}

/**
 * LEGACY COMPATIBILITY LAYER
 * WAJIB untuk FEAC / HTTP / ORCHESTRATOR lama
 */
const singletonBrain = new AriesBrain();

export async function ariesBrainExecute(input: string, ctx: any = {}) {
  return singletonBrain.process({ input, ...ctx });
}
