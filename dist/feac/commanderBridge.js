"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommanderBridge = void 0;
const ariesDispatcher_1 = require("../core/ariesDispatcher");
class CommanderBridge {
    /**
     * Mengirimkan hasil penalaran ARIES ke kedaulatan FEAC via EventBus
     */
    static async sendToCommander(reasoning) {
        console.log("LOG [ARIES]: Preparing to dispatch reasoning to FEAC via Internal Bus...");
        try {
            // Dispatcher sekarang sudah menangani Key secara internal
            const response = await ariesDispatcher_1.AriesDispatcher.dispatchToCommander(reasoning);
            // Response sekarang adalah object { status: string }
            console.log("LOG [ARIES]: System status:", response.status);
            return response;
        }
        catch (error) {
            console.error("LOG [ARIES]: Dispatch Failed!", error.message);
            throw error;
        }
    }
}
exports.CommanderBridge = CommanderBridge;
