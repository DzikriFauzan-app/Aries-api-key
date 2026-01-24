import axios from 'axios';

// Protokol Kedaulatan NeoEngine
const NEO_URL = "http://10.4.35.107:8080";

export const callCouncil = async (agent: string, command: string, params: any = {}) => {
    try {
        const response = await axios.post(`${NEO_URL}/api/task`, {
            agent,
            command,
            params,
            id: `task-${Date.now()}`
        });
        return response.data;
    } catch (error) {
        console.error(`[SovereignBridge] Critical failure connecting to NeoEngine agent ${agent}`);
        throw error;
    }
};

export const sendBatchToNeo = async (tasks: any[]) => {
    const payload = {
        type: "BATCH_EXECUTION",
        count: tasks.length,
        data: tasks,
        timestamp: Date.now()
    };
    try {
        const response = await axios.post(`${NEO_URL}/api/task/batch`, payload);
        return response.data;
    } catch (error) {
        console.error("[Aries] Batch Deployment Failed", error);
    }
};
