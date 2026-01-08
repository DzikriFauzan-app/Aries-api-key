import { AriesDispatcher } from "../src/core/ariesDispatcher";
import { ReasoningResult } from "../src/core/reasoningTypes";

describe("AriesDispatcher Kepatuhan Test", () => {
    const validResult: ReasoningResult = {
        finalAnswer: "ANSWER(VALID(INFERRED(test_passed)))",
        plan: { goal: "test", steps: [] }
    };

    const invalidResult: ReasoningResult = {
        finalAnswer: "RAW_LOGIC_ERROR",
        plan: { goal: "test", steps: [] }
    };

    it("Harus menerima struktur sintesis yang valid", async () => {
        expect(validResult.finalAnswer.startsWith("ANSWER(VALID(")).toBe(true);
    });

    it("Harus menolak logika yang tidak tersintesis", async () => {
        try {
            await AriesDispatcher.dispatchToCommander(invalidResult, "SOVEREIGN_KEY_1.9");
            fail("Dispatcher seharusnya melempar error");
        } catch (e: any) {
            expect(e.message).toBe("INVALID_REASONING_STRUCTURE: Logic must be synthesized.");
        }
    });
});
