"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.processAdminRequest = processAdminRequest;
const ownerCommand_1 = require("./ownerCommand");
function processAdminRequest(req, res) {
    const { command } = req.body;
    try {
        const result = (0, ownerCommand_1.handleOwnerCommand)(command);
        if (result) {
            res.json(result);
        }
        else {
            res.status(400).json({ error: "UNKNOWN_COMMAND" });
        }
    }
    catch (e) {
        res.status(500).json({ error: e.message });
    }
}
