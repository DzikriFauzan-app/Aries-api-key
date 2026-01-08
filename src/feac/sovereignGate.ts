import express from 'express';
import { KeyRegistry } from '../auth/keyRegistry';

const app = express();
const registry = new KeyRegistry();

app.use(express.json());

// Endpoint yang akan dipanggil APK FEAC untuk cek status
app.post('/api/v1/auth/verify', (req, res) => {
    const { apiKey } = req.body;
    const keyData = registry.validate(apiKey);

    if (keyData) {
        console.log(`\n🛡️ [GATE] ALERT: Login Attempt from APK`);
        console.log(`👤 Identity: ${keyData.owner}`);
        console.log(`🎖️ Role: ${keyData.role}`);
        
        return res.json({
            status: "SUCCESS",
            owner: keyData.owner,
            role: keyData.role,
            scopes: keyData.scopes,
            isSovereign: keyData.role === 'OWNER'
        });
    }

    console.log(`\n🚫 [GATE] WARNING: Unauthorized Access Attempt!`);
    return res.status(401).json({ status: "UNAUTHORIZED", message: "Invalid Key" });
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡ FEAC SOVEREIGN GATE ONLINE: Port ${PORT}`);
    console.log(`🔗 Target for APK: http://localhost:${PORT}/api/v1/auth/verify`);
});
