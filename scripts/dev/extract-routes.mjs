import http from 'http';

http.get('http://localhost:8080/openapi.json', (res) => {
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        try {
            const schema = JSON.parse(data);
            console.log("📜 DAFTAR RUTE NEOENGINE DITEMUKAN:");
            console.log("-------------------------------------------");
            Object.keys(schema.paths).forEach(path => {
                const methods = Object.keys(schema.paths[path]).join(', ').toUpperCase();
                console.log(`📍 [${methods}] ${path}`);
            });
            console.log("-------------------------------------------");
        } catch (e) {
            console.error("❌ Gagal membedah openapi.json");
        }
    });
});
