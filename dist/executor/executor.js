"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execute = void 0;
const reasoningEngine_1 = require("../core/reasoningEngine");
/**
 * ARIES COMMAND EXECUTOR - SOVEREIGN ENGINE
 * Standar: Google-Level Infrastructure
 */
const execute = async (body) => {
    // Validasi input tingkat tinggi
    const prompt = body.prompt || body.command || (typeof body === 'string' ? body : JSON.stringify(body));
    console.log(`🚀 [ARIES_KERNEL] Processing Neural Request...`);
    try {
        const result = await reasoningEngine_1.ReasoningEngine.synthesize(prompt);
        return {
            success: true,
            output: result.finalAnswer,
            plan: result.plan,
            timestamp: new Date().toISOString(),
            authority: "Sovereign_Verified"
        };
    }
    catch (error) {
        console.error(`❌ [KERNEL_CRITICAL]`, error.message);
        return {
            success: false,
            error: "NEURAL_SYNTHESIS_FAILED",
            details: error.message
        };
    }
};
exports.execute = execute;
