import { handleOwnerCommand } from "./ownerCommand";

export function processAdminRequest(req: any, res: any) {
  const { command } = req.body;
  
  try {
    const result = handleOwnerCommand(command);
    if (result) {
      res.json(result);
    } else {
      res.status(400).json({ error: "UNKNOWN_COMMAND" });
    }
  } catch (e: any) {
    res.status(500).json({ error: e.message });
  }
}
