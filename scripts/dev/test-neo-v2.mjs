import http from 'http';

const data = JSON.stringify({ action: "start", agents: 139 });
const options = {
  hostname: 'localhost',
  port: 8080,
  path: '/execute', // Mengganti path dari '/' ke '/execute'
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

console.log("📡 [PROBE V2] Mencoba endpoint /execute...");
const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log(`📥 RESPON [${res.statusCode}]: ${body}`);
  });
});
req.write(data);
req.end();
