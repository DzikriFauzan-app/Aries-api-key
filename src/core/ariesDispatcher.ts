import { ReasoningResult } from "./reasoningTypes";
import { EventBus } from "../events/eventBus";
import { randomUUID } from "crypto";

export class AriesDispatcher {
    private static bus = new EventBus(); 

    public static async dispatchToCommander(result: ReasoningResult) {
        const OWNER_HASH = "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1"; 

        if (!result.finalAnswer.startsWith("ANSWER(VALID(")) {
            throw new Error("INVALID_REASONING_STRUCTURE: Logic must be synthesized.");
        }

        await this.bus.publish({
            id: randomUUID(),
            type: "TASK_ASSIGNED",
            source: "ARIES_BRAIN",
            timestamp: Date.now(),
            correlationId: randomUUID(),
            payload: {
                type: "system.exec",
                instruction: result.finalAnswer,
                params: { cmd: result.finalAnswer },
                apiKey: OWNER_HASH
            }
        });

        return { status: "OWNER_COMMAND_DISPATCHED" };
    }
}
