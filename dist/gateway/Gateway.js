"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gateway = void 0;
class Gateway {
    constructor(bus, llm) {
        this.bus = bus;
        this.llm = llm;
        this.bus.subscribe("AGENT_RESPONSE", async (event) => {
            // Optional: Log response
        });
    }
    async handleRequest(req) {
        // 1. Publish Event Request (Audit Trail)
        const eventId = `evt-${Date.now()}`;
        await this.bus.publish({
            id: eventId,
            type: "GATEWAY_REQUEST", // Safety cast if types not synced yet
            source: "gateway",
            timestamp: Date.now(),
            payload: req
        });
        try {
            // 2. Direct LLM Call (Protected by SecuredLLMProvider)
            const result = await this.llm.generate({
                prompt: req.prompt,
                temperature: 0.7
            });
            // 3. Reasoning / Execution Trigger
            // Dalam arsitektur penuh, LLM response akan diparsing.
            // Di sini kita publish RAW response dulu.
            await this.bus.publish({
                id: `resp-${Date.now()}`,
                type: "LLM_RESPONSE",
                source: "gateway",
                timestamp: Date.now(),
                payload: {
                    originalReq: req.requestId,
                    text: result.text,
                    usage: result.usage
                }
            });
        }
        catch (error) {
            console.error("[Gateway] Error processing request:", error);
            await this.bus.publish({
                id: `err-${Date.now()}`,
                type: "SYSTEM_ERROR",
                source: "gateway",
                timestamp: Date.now(),
                payload: { error: error.message }
            });
        }
    }
}
exports.Gateway = Gateway;
