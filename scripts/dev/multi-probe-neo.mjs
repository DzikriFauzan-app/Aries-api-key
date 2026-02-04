import http from 'http';

const paths = ['/api/task', '/api/task/batch', '/api/emergent/build', '/api/emergent/scan'];
const data = JSON.stringify({ method: "execute", payload: { command: "PING" } });

console.log("🕵️ Mencari Entry Point NeoEngine yang aktif...");

paths.forEach(path => {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: path,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => {
            if (res.statusCode !== 404) {
                console.log(`✅ FOUND: ${path} [Status: ${res.statusCode}]`);
                console.log(`📥 Response: ${body}`);
            } else {
                console.log(`❌ NOT FOUND: ${path}`);
            }
        });
    });
    req.on('error', () => {});
    req.write(data);
    req.end();
});
