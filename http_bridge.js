const express = require("express");
const { execute } = require("./dist/executor");

const app = express();
app.use(express.json());

app.post("/v1/command", async (req, res) => {
  const out = await execute(req.body);
  res.json(out);
});

app.listen(3333, () => {
  console.log("ARIES HTTP BRIDGE ON 3333");
});
