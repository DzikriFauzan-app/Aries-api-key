var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from "axios";
export class AriesDispatcher {
    static dispatchToCommander(result, apiKey) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validasi Struktur Bawang: Must be ANSWER(VALID(INFERRED(...)))
            if (!result.finalAnswer.startsWith("ANSWER(VALID(")) {
                throw new Error("INVALID_REASONING_STRUCTURE: Logic must be synthesized.");
            }
            const payload = {
                instruction: result.finalAnswer,
                plan: result.plan,
                auth_key: apiKey
            };
            // Mengirimkan hasil pemikiran ke FEAC Commander (Port 3001)
            return yield axios.post(this.COMMANDER_ENDPOINT, payload);
        });
    }
}
AriesDispatcher.COMMANDER_ENDPOINT = "http://localhost:3001/execute";
