"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.billingHook = billingHook;
function billingHook(apiKey, usage) {
    // FEAC / Stripe / Manual hook
    // Dipanggil async oleh FEAC layer
    return {
        owner: apiKey.owner,
        used: usage.tokens,
        quota: apiKey.quota,
        billable: Math.max(0, usage.tokens - apiKey.quota)
    };
}
