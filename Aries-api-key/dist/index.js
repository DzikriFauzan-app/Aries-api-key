"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ariesBrain_1 = require("./brain/ariesBrain");
const publicAuthMiddleware_1 = require("./api/publicAuthMiddleware");
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
const brain = new ariesBrain_1.AriesBrain();
app.post("/v1/brain", publicAuthMiddleware_1.publicAuth, async (req, res) => {
    try {
        const result = await brain.process({
            input: req.body.input,
            apiKey: req.apiKey
        });
        res.json(result);
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
});
const PORT = Number(process.env.PORT) || 3333;
app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ARIES] SOVEREIGN GATEWAY ACTIVE ON PORT: ${PORT}`);
});
const fs_1 = __importDefault(require("fs"));
app.get("/v1/usage", publicAuthMiddleware_1.publicAuth, (req, res) => {
    const billing = JSON.parse(fs_1.default.readFileSync("data/billing.json", "utf8"));
    const rec = billing[req.apiKey];
    res.json({
        plan: rec.plan,
        used: rec.used,
        limit: rec.limit,
        resetAt: rec.resetAt
    });
});
