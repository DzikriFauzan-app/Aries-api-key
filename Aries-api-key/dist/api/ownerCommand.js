"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleOwnerCommand = handleOwnerCommand;
const licenseStore_1 = require("./licenseStore");
function handleOwnerCommand(cmd) {
    if (cmd.startsWith("upgrade")) {
        const [, apiKey, plan] = cmd.split(" ");
        (0, licenseStore_1.setLicense)(apiKey, plan);
        return { status: "UPGRADED", apiKey, plan };
    }
    return null;
}
