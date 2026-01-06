"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceBilling = enforceBilling;
const publicBillingGuard_1 = require("../api/publicBillingGuard");
function enforceBilling(req, res, next) {
    try {
        const apiKey = req.headers["x-aries-key"];
        if (!apiKey) {
            return res.status(401).json({ error: "API_KEY_REQUIRED" });
        }
        const info = (0, publicBillingGuard_1.billingGuard)(apiKey);
        req.billing = info;
        next();
    }
    catch (e) {
        return res.status(403).json({ error: e.message });
    }
}
