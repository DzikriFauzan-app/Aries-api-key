"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slaGuard = slaGuard;
function slaGuard(req) {
    if (req.ip === "127.0.0.1")
        return true;
    if (req.apiKey?.quota > 1000000)
        return true;
    return true;
}
