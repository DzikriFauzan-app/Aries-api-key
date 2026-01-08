"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/api/auth', (req, res) => {
    console.log("🔐 [AUTH] Injeksi API Key:", req.body.api_key);
    res.json({ status: "authorized", session: "active", engine: "Neo-40" });
});
app.post('/api/chat', (req, res) => {
    console.log("🧠 [BRAIN] Memproses pesan:", req.body.message);
    res.json({ response: "Analisa Sovereign Selesai. Kedaulatan Terjamin." });
});
app.listen(3000, '0.0.0.0', () => {
    console.log("🏛️  ARIES KERNEL ONLINE ON PORT 3000");
});
