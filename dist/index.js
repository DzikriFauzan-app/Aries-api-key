const express = require('express');
const app = express();
app.use(express.json());

app.post('/api/auth', (req, res) => res.json({ status: "authorized" }));
app.post('/api/chat', (req, res) => {
    console.log("🧠 Message Received:", req.body.message);
    res.json({ response: "Sovereign AI: Analisa Chat Selesai." });
});

app.listen(3000, '0.0.0.0', () => console.log("🏛️ ARIES CORE 3000 ONLINE"));
