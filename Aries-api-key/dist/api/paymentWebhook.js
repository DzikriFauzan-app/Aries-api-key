"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentWebhook = paymentWebhook;
const licenseStore_1 = require("./licenseStore");
function paymentWebhook(payload) {
    const { apiKey, plan, status } = payload;
    if (status !== "PAID") {
        return { ignored: true };
    }
    (0, licenseStore_1.setLicense)(apiKey, plan);
    return { upgraded: true };
}
