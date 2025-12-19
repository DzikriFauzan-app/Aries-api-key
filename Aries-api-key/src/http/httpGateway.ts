import express from "express";
import bodyParser from "body-parser";
import { ariesBrainExecute } from "../brain/ariesBrain";
import { enforceGovernance } from "../api/publicGovernance";

export function createHttpGateway() {
  const app = express();
  app.use(bodyParser.json());

  app.post(
    "/v1/brain",
    enforceGovernance,
    async (req: any, res: any) => {
      try {
        const output = await ariesBrainExecute(
          req.body.input,
          req.governance
        );

        res.json({
          output,
          governance: req.governance
        });
      } catch (e: any) {
        res.status(500).json({ error: e.message });
      }
    }
  );

  return app;
}
