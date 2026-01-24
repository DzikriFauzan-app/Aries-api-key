import { NeoCore } from "../synapse/reasoning/neoCore_v30";
import { ReasoningResult } from "../core/reasoningTypes";
import { AriesDispatcher } from "../core/ariesDispatcher";

export class CommanderBridge {
    /**
     * Mengirimkan hasil penalaran ARIES ke kedaulatan FEAC via EventBus
     */
    public static async sendToCommander(reasoning: ReasoningResult) {
        console.log("LOG [ARIES]: Preparing to dispatch reasoning to FEAC via Internal Bus...");
        
        try {
            // Dispatcher sekarang sudah menangani Key secara internal
            const response = await AriesDispatcher.dispatchToCommander(reasoning);
            
            // Response sekarang adalah object { status: string }
            console.log("LOG [ARIES]: System status:", response.status);
            return response;
        } catch (error: any) {
            console.error("LOG [ARIES]: Dispatch Failed!", error.message);
            throw error;
        }
    }
}
