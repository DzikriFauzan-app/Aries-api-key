import http from 'http';

const assetData = JSON.stringify({
  task_id: `GENESIS-RENDER-${Date.now()}`,
  method: "execute",
  payload: {
    command: "INITIALIZE_ASSET_RECORDING",
    agent_count: 139,
    mode: "ULTIMATE_SOVEREIGN",
    use_agent: "asset_agent" 
  }
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/task',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(assetData)
  }
};

console.log("🎬 [ARIES -> NEO] Memerintahkan Asset Agent...");

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log("-------------------------------------------");
    console.log(`📥 RESPON NEOENGINE: ${body}`);
    console.log("-------------------------------------------");
  });
});

req.on('error', (e) => console.error("❌ NeoEngine tidak merespon: ", e.message));
req.write(assetData);
req.end();
