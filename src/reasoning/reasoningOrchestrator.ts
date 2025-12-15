import { EventBus } from "../events/eventBus";
import { AriesEvent } from "../events/eventTypes";
import { LLMProvider } from "../llm/types";
import { randomUUID } from "crypto";

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
    this.bus.subscribe("AGENT_COMMAND", async (evt: AriesEvent) => {
      await this.handle(evt);
    });
  }

  private async handle(evt: AriesEvent) {
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
${evt.payload.input}
`;

    const res = await this.llm.generate({
      prompt,
      temperature: 0
    });

    let parsed: ReasoningResult;
    try {
      parsed = JSON.parse(res.text);
    } catch {
      throw new Error("LLM returned invalid JSON");
    }

    const eventType =
      parsed.action === "RESPOND"
        ? "AGENT_RESPONSE"
        : "TASK_ASSIGNED";

    await this.bus.publish({
      id: randomUUID(),
      type: eventType,
      source: "REASONING",
      timestamp: Date.now(),
      correlationId: evt.correlationId,
      payload: parsed
    });
  }
}
