const express = require("express");
// Memperbaiki jalur ke sub-folder executor
const { execute } = require("./dist/executor/executor");

const app = express();
app.use(express.json());

app.post("/v1/command", async (req, res) => {
  console.log("📥 [BRIDGE] Command Received");
  try {
    const out = await execute(req.body);
    res.json(out);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.listen(3333, '0.0.0.0', () => {
  console.log("⚡ ARIES DEIFIC BRIDGE ACTIVE ON PORT 3333");
});
