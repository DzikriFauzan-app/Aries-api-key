"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ownerLicenseCommand = ownerLicenseCommand;
const licenseStore_1 = require("./licenseStore");
function ownerLicenseCommand(cmd) {
    if (!cmd.startsWith("license"))
        return null;
    const [, apiKey, plan] = cmd.split(" ");
    (0, licenseStore_1.setLicense)(apiKey, plan);
    return {
        status: "LICENSE_UPDATED",
        apiKey,
        plan
    };
}
