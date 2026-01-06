"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootSovereign = bootSovereign;
const httpGateway_1 = require("../http/httpGateway");
function bootSovereign() {
    const PORT = Number(process.env.PORT || 3333);
    const app = (0, httpGateway_1.createHttpGateway)();
    app.listen(PORT, "0.0.0.0", () => {
        console.log("[ARIES] SOVEREIGN BOOT ACTIVE ON", PORT);
    });
}
