"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dispatch = dispatch;
const internalExecute_1 = require("./internalExecute");
async function dispatch(payload) {
    return (0, internalExecute_1.internalExecute)(payload);
}
