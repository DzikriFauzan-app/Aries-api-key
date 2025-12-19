import { registerFsTool } from "./fsRegistry";

registerFsTool({
  name: "fs.read",
  readOnly: true,
  maxSizeKB: 512
});

registerFsTool({
  name: "fs.write",
  readOnly: false,
  maxSizeKB: 512
});

registerFsTool({
  name: "fs.list",
  readOnly: true,
  maxSizeKB: 64
});
