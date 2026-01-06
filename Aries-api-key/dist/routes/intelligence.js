"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleIntelligence = void 0;
const feacLogic_1 = require("../logic/feacLogic");
const feac = new feacLogic_1.FEACLogic();
const handleIntelligence = async (req, res) => {
    try {
        const { prompt, target_agent } = req.body;
        if (target_agent === "FEAC") {
            const result = await feac.analyzeAndExecute(prompt, req.body.payload || {});
            return res.send({
                meta: { server: "Aries Sovereign Node", status: "SUCCESS" },
                result: result
            });
        }
        return res.status(400).send({ error: "Target Agent Unknown" });
    }
    catch (error) {
        return res.status(500).send({ error: "Intelligence Layer Crash", details: error.message });
    }
};
exports.handleIntelligence = handleIntelligence;
