import http from 'http';

// KUNCI TUNGGAL DZIKRI (DIAMBIL DARI STATE ARIES)
const SOVEREIGN_KEY = "aries-owner-33d7d4d4224cdb40b0aef205b64f76414efb2f9bc70ee1f1";

const server = http.createServer((req, res) => {
    // Jalur Komunikasi FEAC UI
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const authHeader = req.headers['authorization'] || "";
    const providedKey = authHeader.replace('Bearer ', '').trim();

    // VERIFIKASI HANYA OLEH ARIES
    if (providedKey === SOVEREIGN_KEY) {
        console.log("🛡️ [ARIES_AUTH]: Otoritas Dzikri Diterima. Mengabaikan Verifikasi Eksternal.");
        
        // Langsung berikan respon SUCCESS ke UI tanpa menunggu Neo-Engine
        // Karena Dashboard adalah wilayah kedaulatan Aries
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            status: "SUCCESS", 
            message: "Sovereign Authority Verified by Aries Core",
            engine_state: "STANDBY" 
        }));
    } else {
        console.log("🛑 [DENIED]: Kunci tidak dikenal oleh sistem Aries.");
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: "DENIED", message: "Unauthorized Sovereign" }));
    }
});

server.listen(3333, () => {
    console.log("🚀 BRIDGE RESTORED: Otoritas Kembali ke Tangan Aries.");
});
