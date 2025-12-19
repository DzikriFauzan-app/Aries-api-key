import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { AriesBrain } from "./brain/ariesBrain";
import { publicAuth } from "./api/publicAuthMiddleware";

const app = express();
app.use(bodyParser.json());

const brain = new AriesBrain();

app.post(
  "/v1/brain",
  publicAuth,
  async (req: Request & { apiKey?: any }, res: Response) => {
    try {
      const result = await brain.process({
        input: req.body.input,
        apiKey: req.apiKey
      });
      res.json(result);
    } catch (e: any) {
      res.status(500).json({ error: e.message });
    }
  }
);

const PORT = Number(process.env.PORT) || 3333;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[ARIES] SOVEREIGN GATEWAY ACTIVE ON PORT: ${PORT}`);
});

import fs from "fs";

app.get("/v1/usage", publicAuth, (req, res) => {
  const billing = JSON.parse(fs.readFileSync("data/billing.json", "utf8"));
  const rec = billing[(req as any).apiKey];

  res.json({
    plan: rec.plan,
    used: rec.used,
    limit: rec.limit,
    resetAt: rec.resetAt
  });
});

// === USAGE RECORD (POST-EXECUTION) ===
import { recordUsage } from "./api/usageMeter";
