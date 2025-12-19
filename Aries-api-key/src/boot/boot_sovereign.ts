import { createHttpGateway } from "../http/httpGateway";

export function bootSovereign() {
  const PORT = Number(process.env.PORT || 3333);
  const app = createHttpGateway();

  app.listen(PORT, "0.0.0.0", () => {
    console.log("[ARIES] SOVEREIGN BOOT ACTIVE ON", PORT);
  });
}
