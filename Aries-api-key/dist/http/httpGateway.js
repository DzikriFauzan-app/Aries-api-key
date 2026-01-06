"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHttpGateway = createHttpGateway;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const ariesBrain_1 = require("../brain/ariesBrain");
const publicGovernance_1 = require("../api/publicGovernance");
function createHttpGateway() {
    const app = (0, express_1.default)();
    app.use(body_parser_1.default.json());
    app.post("/v1/brain", publicGovernance_1.enforceGovernance, async (req, res) => {
        try {
            const output = await (0, ariesBrain_1.ariesBrainExecute)(req.body.input, req.governance);
            res.json({
                output,
                governance: req.governance
            });
        }
        catch (e) {
            res.status(500).json({ error: e.message });
        }
    });
    return app;
}
