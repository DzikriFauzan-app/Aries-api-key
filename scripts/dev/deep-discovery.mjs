import http from 'http';

const paths = ['/docs', '/openapi.json', '/api/v1/task', '/status', '/health'];

console.log("🔍 [DEEP_SCAN] Mencari jejak arsitektur NeoEngine...");

paths.forEach(path => {
    const options = {
        hostname: 'localhost',
        port: 8080,
        path: path,
        method: 'GET' // Gunakan GET untuk mencari dokumentasi
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (d) => body += d);
        res.on('end', () => {
            console.log(`📡 Path: ${path.padEnd(15)} | Status: ${res.statusCode}`);
            if (res.statusCode === 200 && path === '/openapi.json') {
                console.log("💎 [EUREKA] Struktur API Ditemukan! Menganalisis rute...");
                // Kita bisa membedah isi openapi.json di sini jika ditemukan
            }
        });
    });
    req.on('error', () => {});
    req.end();
});
