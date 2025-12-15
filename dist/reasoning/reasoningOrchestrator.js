"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReasoningOrchestrator = void 0;
const crypto_1 = require("crypto");
class ReasoningOrchestrator {
    constructor(bus, llm) {
        this.bus = bus;
        this.llm = llm;
    }
    start() {
        this.bus.subscribe("AGENT_COMMAND", async (evt) => {
            await this.handle(evt);
        });
    }
    async handle(evt) {
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
        let parsed;
        try {
            parsed = JSON.parse(res.text);
        }
        catch {
            throw new Error("LLM returned invalid JSON");
        }
        const eventType = parsed.action === "RESPOND"
            ? "AGENT_RESPONSE"
            : "TASK_ASSIGNED";
        await this.bus.publish({
            id: (0, crypto_1.randomUUID)(),
            type: eventType,
            source: "REASONING",
            timestamp: Date.now(),
            correlationId: evt.correlationId,
            payload: parsed
        });
    }
}
exports.ReasoningOrchestrator = ReasoningOrchestrator;
