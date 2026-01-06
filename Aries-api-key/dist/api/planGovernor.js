"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyPlanLimits = applyPlanLimits;
function applyPlanLimits(plan, ctx) {
    if (plan === "FREE") {
        ctx.maxTokens = 5000;
        ctx.allowMemory = false;
        ctx.allowTools = false;
    }
    if (plan === "PRO") {
        ctx.maxTokens = 100000;
        ctx.allowMemory = true;
        ctx.allowTools = false;
    }
    if (plan === "ENTERPRISE") {
        ctx.maxTokens = 1000000;
        ctx.allowMemory = true;
        ctx.allowTools = true;
    }
}
