import { FEACLogic } from '../logic/feacLogic';

const feac = new FEACLogic();

export const handleIntelligence = async (req: any, res: any) => {
    try {
        const { prompt, target_agent } = req.body;

        if (target_agent === "FEAC") {
            const result = await feac.analyzeAndExecute(prompt, req.body.payload || {});
            return res.send({
                meta: { server: "Aries Sovereign Node", status: "SUCCESS" },
                result: result
            });
        }

        return res.status(400).send({ error: "Target Agent Unknown" });
    } catch (error: any) {
        return res.status(500).send({ error: "Intelligence Layer Crash", details: error.message });
    }
};
