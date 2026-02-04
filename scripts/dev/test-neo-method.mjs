import http from 'http';

const data = JSON.stringify({
  method: "execute", 
  command: "START_GENESIS",
  agents: 139
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/', 
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log("📡 [PROBE] Mengirim simulasi instruksi ke NeoEngine (8080)...");

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log("-------------------------------------------");
    console.log(`📥 RESPON NEOENGINE: ${body}`);
    console.log("-------------------------------------------");
  });
});

req.on('error', (e) => console.error(`❌ Gagal terhubung ke NeoEngine: ${e.message}`));
req.write(data);
req.end();
