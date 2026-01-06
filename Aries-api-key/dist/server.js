"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const httpGateway_1 = require("./http/httpGateway");
const PORT = Number(process.env.PORT || 3333);
const app = (0, httpGateway_1.createHttpGateway)();
app.listen(PORT, "0.0.0.0", () => {
    console.log("[ARIES] HTTP GATEWAY ACTIVE ON", PORT);
});
