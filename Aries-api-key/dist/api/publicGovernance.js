"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceGovernance = enforceGovernance;
const licenseStore_1 = require("./licenseStore");
const planGovernor_1 = require("./planGovernor");
function enforceGovernance(req, res, next) {
    const apiKey = req.apiKey;
    const license = (0, licenseStore_1.getLicense)(apiKey);
    if (license.status !== "ACTIVE") {
        return res.status(403).json({ error: "LICENSE_INACTIVE" });
    }
    if (license.expiresAt < Date.now()) {
        return res.status(403).json({ error: "LICENSE_EXPIRED" });
    }
    req.governance = {};
    (0, planGovernor_1.applyPlanLimits)(license.plan, req.governance);
    next();
}
