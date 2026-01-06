"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeVector = storeVector;
exports.recallVector = recallVector;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const vectorUtils_1 = require("./vectorUtils");
const DB_PATH = path_1.default.join(process.cwd(), "data", "vector_memory.jsonl");
function storeVector(session, text) {
    const record = {
        session,
        text,
        vector: (0, vectorUtils_1.textToVector)(text),
        ts: Date.now()
    };
    fs_1.default.appendFileSync(DB_PATH, JSON.stringify(record) + "\n");
}
function recallVector(query, topK = 3) {
    if (!fs_1.default.existsSync(DB_PATH))
        return [];
    const qv = (0, vectorUtils_1.textToVector)(query);
    const lines = fs_1.default.readFileSync(DB_PATH, "utf8").trim().split("\n");
    return lines
        .map(l => JSON.parse(l))
        .map(r => ({
        text: r.text,
        score: (0, vectorUtils_1.cosine)(qv, r.vector)
    }))
        .sort((a, b) => b.score - a.score)
        .slice(0, topK);
}
