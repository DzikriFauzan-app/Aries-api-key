var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AriesDispatcher } from "../src/core/ariesDispatcher";
describe("AriesDispatcher Kepatuhan Test", () => {
    const validResult = {
        finalAnswer: "ANSWER(VALID(INFERRED(test_passed)))",
        plan: { goal: "test", steps: [] }
    };
    const invalidResult = {
        finalAnswer: "RAW_LOGIC_ERROR",
        plan: { goal: "test", steps: [] }
    };
    it("Harus menerima struktur sintesis yang valid", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(validResult.finalAnswer.startsWith("ANSWER(VALID(")).toBe(true);
    }));
    it("Harus menolak logika yang tidak tersintesis", () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield AriesDispatcher.dispatchToCommander(invalidResult, "SOVEREIGN_KEY_1.9");
            fail("Dispatcher seharusnya melempar error");
        }
        catch (e) {
            expect(e.message).toBe("INVALID_REASONING_STRUCTURE: Logic must be synthesized.");
        }
    }));
});
