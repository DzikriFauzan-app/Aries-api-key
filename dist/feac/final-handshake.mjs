import http from 'http';

const check = (name, port) => {
    return new Promise((resolve) => {
        const req = http.get(`http://localhost:${port}`, (res) => {
            console.log(`📡 ${name.padEnd(15)} (Port ${port}): ONLINE [Status: ${res.statusCode}]`);
            resolve(true);
        });

        req.on('error', (err) => {
            console.log(`❌ ${name.padEnd(15)} (Port ${port}): OFFLINE`);
            resolve(false);
        });

        req.setTimeout(2000, () => {
            req.destroy();
            resolve(false);
        });
    });
};

console.log("🛠️  MEMULAI VALIDASI INFRASTRUKTUR SOVEREIGN\n");
console.log("------------------------------------------------");

async function run() {
    await check('Aries Gate', 3001);
    await check('Aries Bridge', 3333);
    await check('Neo Engine', 8080);
    await check('FEAC Dashboard', 3000);
    
    console.log("------------------------------------------------");
    console.log("\n🚀 Sovereign, jika semua ONLINE, FEAC siap digunakan.");
    console.log("Buka browser di: http://localhost:3000");
}

run();
