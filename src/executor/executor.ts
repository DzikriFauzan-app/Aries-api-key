import { ReasoningEngine } from "../core/reasoningEngine";

/**
 * ARIES COMMAND EXECUTOR - SOVEREIGN ENGINE
 * Standar: Google-Level Infrastructure
 */
export const execute = async (body: any) => {
    // Validasi input tingkat tinggi
    const prompt = body.prompt || body.command || (typeof body === 'string' ? body : JSON.stringify(body));
    
    console.log(`🚀 [ARIES_KERNEL] Processing Neural Request...`);
    
    try {
        const result = await ReasoningEngine.synthesize(prompt);
        return {
            success: true,
            output: result.finalAnswer,
            plan: result.plan,
            timestamp: new Date().toISOString(),
            authority: "Sovereign_Verified"
        };
    } catch (error: any) {
        console.error(`❌ [KERNEL_CRITICAL]`, error.message);
        return {
            success: false,
            error: "NEURAL_SYNTHESIS_FAILED",
            details: error.message
        };
    }
};
