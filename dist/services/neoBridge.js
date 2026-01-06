"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendBatchToNeo = exports.callCouncil = void 0;
const axios_1 = __importDefault(require("axios"));
// Protokol Kedaulatan NeoEngine
const NEO_URL = "http://10.4.35.107:8080";
const callCouncil = async (agent, command, params = {}) => {
    try {
        const response = await axios_1.default.post(`${NEO_URL}/api/task`, {
            agent,
            command,
            params,
            id: `task-${Date.now()}`
        });
        return response.data;
    }
    catch (error) {
        console.error(`[SovereignBridge] Critical failure connecting to NeoEngine agent ${agent}`);
        throw error;
    }
};
exports.callCouncil = callCouncil;
const sendBatchToNeo = async (tasks) => {
    const payload = {
        type: "BATCH_EXECUTION",
        count: tasks.length,
        data: tasks,
        timestamp: Date.now()
    };
    try {
        const response = await axios_1.default.post(`${NEO_URL}/api/task/batch`, payload);
        return response.data;
    }
    catch (error) {
        console.error("[Aries] Batch Deployment Failed", error);
    }
};
exports.sendBatchToNeo = sendBatchToNeo;
