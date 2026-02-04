/**
 * @status CERTIFIED_INDUSTRY_GRADE
 */
import { Logger } from './audit/auditLogger';
import { createHttpGateway } from "./http/httpGateway";


const PORT = Number(process.env.PORT || 3333);
const app = createHttpGateway();

app.listen(PORT, "0.0.0.0", () => {
  console.log("[ARIES] HTTP GATEWAY ACTIVE ON", PORT);
});
