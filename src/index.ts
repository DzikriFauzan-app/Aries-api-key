import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { saveMemoryToLocal } from './memory_engine';
import { scanLocalRepo, autoExecuteFix } from './emergent_engine';

const app = express();
app.use(cors());
app.use(express.json());

const KEY_PATH = path.join(__dirname, 'data', 'owner.key.json');
const KNOWLEDGE_FILE = path.join(__dirname, 'data', 'knowledge_pool.json');
let chatRooms: any = {};

if (!fs.existsSync(path.join(__dirname, 'data'))) fs.mkdirSync(path.join(__dirname, 'data'));

const getSecureOwnerKey = () => {
  try {
    if (fs.existsSync(KEY_PATH)) {
      const keyData = JSON.parse(fs.readFileSync(KEY_PATH, 'utf8'));
      return keyData.key || keyData.owner_key;
    }
    return null;
  } catch (err) { return null; }
};

app.get('/api/emergent/scan', (req, res) => {
  res.json({ success: true, data: scanLocalRepo('~/Feac-ultimate-sovereign') });
});

app.post('/api/emergent/approve', async (req, res) => {
  const result = await autoExecuteFix(req.body.issue);
  res.json({ success: true, result });
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🏛️  ARIES TOTAL CORE ONLINE`);
    console.log(`🛰️  Endpoint: http://10.4.35.107:${PORT}`);
    console.log(`🔐 Security: Connected to Private Owner Key (${KEY_PATH})\n`);
});

// --- BRIDGE TO NEO ENGINE (THE EXECUTIONER) ---
app.post('/api/bridge/neo', async (req, res) => {
  const { task, payload } = req.body;
  console.log(`🧠 [ARIES] Directing Neo to execute: ${task}`);
  
  try {
    // Aries memerintah Neo di port 3001
    const neoResponse = await fetch('http://localhost:3001/api/neo/task', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: task, ...payload })
    });
    const data = await neoResponse.json();
    res.json({ success: true, from_neo: data });
  } catch (err) {
    res.status(500).json({ success: false, message: "Neo Engine Offline" });
  }
});
