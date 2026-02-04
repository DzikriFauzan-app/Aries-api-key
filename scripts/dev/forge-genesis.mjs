import http from 'http';

const masterpieceData = JSON.stringify({
  action: "forge",
  target: "ASSET_RECORDING",
  config: {
    agents: 139,
    mode: "ULTIMATE",
    quality: "MASTERPIECE",
    use_agent: "asset_agent"
  },
  timestamp: new Date().toISOString()
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/forge_masterpiece', // JALUR RESMI YANG DITEMUKAN
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(masterpieceData)
  }
};

console.log("⚒️ [FORGE] Memulai pembuatan mahakarya aset via NeoEngine...");

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log("-------------------------------------------");
    console.log(`📥 STATUS: ${res.statusCode}`);
    console.log(`📥 RESPON: ${body}`);
    console.log("-------------------------------------------");
    if (res.statusCode === 200 || res.statusCode === 201) {
       console.log("🎨 MAHAKARYA DIMULAI! 139 Agen sedang bekerja.");
    }
  });
});

req.on('error', (e) => console.error("❌ Forge Gagal: ", e.message));
req.write(masterpieceData);
req.end();
