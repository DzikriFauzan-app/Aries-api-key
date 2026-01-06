"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.enforceDowngrade = enforceDowngrade;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const gracePolicy_1 = require("./gracePolicy");
const BILLING_DB = path.join(process.cwd(), "data/billing.json");
const PLAN_DB = path.join(process.cwd(), "data/licenses.json");
function load(filePath) {
    if (!fs.existsSync(filePath))
        return {};
    return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}
function save(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}
function enforceDowngrade(userId) {
    const billing = load(BILLING_DB);
    const plans = load(PLAN_DB);
    const b = billing[userId];
    if (!b || !plans[userId])
        return;
    const grace = (0, gracePolicy_1.getGraceStatus)(b.expireAt);
    if (grace.status === "EXPIRED_FORCE_FREE" || b.status === "EXPIRED") {
        if (plans[userId].plan !== "FREE") {
            plans[userId].plan = "FREE";
            save(PLAN_DB, plans);
            console.log(`[TERMINATED] User ${userId} exceeded 24h grace. Downgraded to FREE.`);
        }
    }
    else if (grace.status === "GOLDEN_HOUR") {
        console.log(`[MARKETING] User ${userId} in Golden Hour! Offering ${grace.offers?.annual}`);
    }
}
