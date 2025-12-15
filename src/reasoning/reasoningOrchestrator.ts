import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { LLMProvider } from "../llm/types";
import { randomUUID } from "crypto";

type InputPayload = {
  input: string;
};

type ReasoningResult = {
  intent: string;
  action: "RESPOND" | "ASSIGN";
  target: string | null;
  message: string;
};

export class ReasoningOrchestrator {
  constructor(
    private bus: EventBus,
    private llm: LLMProvider
  ) {}

  start() {
    // FIX: Type annotation
    this.bus.subscribe("AGENT_COMMAND", async (evt: AriesEvent) => {
      await this.handle(evt);
    });
  }

  private async handle(evt: AriesEvent) {
    const payload = evt.payload as InputPayload;

    const prompt = `
You are Aries Reasoning Core.
Output MUST be valid JSON ONLY.

Schema:
{
  "intent": string,
  "action": "RESPOND" | "ASSIGN",
  "target": string | null,
  "message": string
}

User Input:
${payload.input}
`;

    const res = await this.llm.generate({
      prompt,
      temperature: 0
    });

    let parsed: ReasoningResult;
    try {
       parsed = JSON.parse(res.text) as ReasoningResult;
    } catch {
       // Fallback jika LLM halusinasi
       parsed = { intent: "error", action: "RESPOND", target: null, message: "I am confused." };
    }

    await this.bus.publish({
      id: randomUUID(),
      type: "AGENT_RESPONSE",
      source: "REASONING",
      timestamp: Date.now(),
      correlationId: evt.correlationId,
      payload: parsed
    });
  }
}
