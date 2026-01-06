"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remember = remember;
exports.recall = recall;
const memoryStore = {};
function remember(session, data) {
    if (!memoryStore[session])
        memoryStore[session] = [];
    memoryStore[session].push(data);
}
function recall(session) {
    return memoryStore[session] || [];
}
