"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Executor = void 0;
exports.executeTask = executeTask;
const authority_1 = require("../auth/authority");
const eventBus_1 = require("../events/eventBus");
class Executor {
    async run(input) {
        return {
            output: input,
            engine: "ARIES_EXECUTOR"
        };
    }
}
exports.Executor = Executor;
/* === HELPER UNTUK BRAIN === */
async function executeTask(payload) {
    const auth = (0, authority_1.verifyAuthority)(payload.apiKey);
    if (!auth.allowed) {
        throw new Error("EXECUTOR_AUTH_DENIED");
    }
    const executor = new Executor();
    const result = await executor.run(payload.input);
    eventBus_1.EventBus.emit("EXECUTOR_FINISHED", {
        session: payload.session_id,
        user: payload.user_id,
        result
    });
    return result;
}
