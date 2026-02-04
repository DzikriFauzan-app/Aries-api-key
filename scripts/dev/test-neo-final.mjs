import http from 'http';

const data = JSON.stringify({
  task_id: "sovereign-alpha-1",
  method: "execute",
  payload: {
    command: "RENDER_ASSET",
    agents: 139,
    priority: "ULTIMATE"
  }
});

const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/api/task', // MENGGUNAKAN PATH HASIL GREP
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

console.log("📡 [ULTIMATE_PROBE] Menembak NeoEngine via /api/task...");

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log("-------------------------------------------");
    console.log(`📥 STATUS: ${res.statusCode}`);
    console.log(`📥 DATA  : ${body}`);
    console.log("-------------------------------------------");
    if (res.statusCode === 200 || res.statusCode === 201) {
       console.log("🚀 HANDSHAKE SUCCESS! NeoEngine Siap Melayani.");
    }
  });
});

req.on('error', (e) => console.error(`❌ Gagal: ${e.message}`));
req.write(data);
req.end();
