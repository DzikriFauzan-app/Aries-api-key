import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// DATABASE KUNCI OWNER ASLI
const AUTH_DATABASE = new Map([
    ['aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1', { 
        role: 'OWNER', 
        level: 'GOD_MODE', 
        scopes: ['*'] 
    }]
]);

app.post('/api/auth/validate-key', (req, res) => {
    const { apiKey } = req.body;
    const ownerData = AUTH_DATABASE.get(apiKey);
    
    if (ownerData) {
        console.log("👑 [AUTH] OWNER ACCESS GRANTED");
        return res.json({
            success: true,
            status: 'AUTHORIZED',
            level: ownerData.level,
            role: ownerData.role,
            protocol: 'SOVEREIGN_ULTIMATE',
            nodes: 4,
            revenue: 'MAX'
        });
    }

    console.log("⚠️ [AUTH] Unauthorized attempt with key: " + apiKey?.substring(0, 10) + "...");
    return res.status(401).json({ success: false, status: 'UNAUTHORIZED' });
});

app.listen(3000, '0.0.0.0', () => {
    console.log('🏛️ ARIES CORE ONLINE - OWNER MODE ACTIVE');
});
