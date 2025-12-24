import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());
app.use(express.json());

// 1. STATUS
app.get('/api/emergent/status', (req: any, res: any) => {
    res.json({
        success: true,
        status: "CONNECTED",
        message: "Aries Sovereign via Cloudflare Tunnel"
    });
});

// 2. PROXY SCAN
app.get('/api/emergent/scan', async (req: any, res: any) => {
    try {
        const response = await axios.get('http://127.0.0.1:8080/api/emergent/scan');
        res.json(response.data);
    } catch (e: any) {
        res.status(500).json({ 
            success: false, 
            msg: "Neo Engine Unreachable",
            error: e.message 
        });
    }
});

const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log('🏛️ ARIES SOVEREIGN ONLINE ON PORT 3000');
});
