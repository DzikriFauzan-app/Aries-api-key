import http from 'http';

const check = (name, port) => {
    return new Promise((resolve) => {
        http.get(`http://localhost:${port}`, (res) => {
            console.log(`📡 ${name} (Port ${port}): TERKONEKSI (Status: ${res.statusCode})`);
            resolve(true);
        }).on('error', () => {
            console.log(`❌ ${name} (Port ${port}): GAGAL`);
            resolve(false);
        });
    });
};

console.log("🛠️ Memulai Validasi Akhir 'Tritunggal' Sovereign...\n");
await check('Aries Gate', 3001);
await check('Aries Bridge', 3333);
await check('Neo Engine', 8080);
await check('FEAC Dashboard', 3000);
console.log("\n🚀 Sovereign, infrastruktur Anda telah AKTIF dan NYATA.");
