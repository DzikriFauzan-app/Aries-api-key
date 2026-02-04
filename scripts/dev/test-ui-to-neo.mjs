import http from 'http';

const uiData = JSON.stringify({
  title: "Dashboard_Handshake",
  genre: "System_Check",
  features: ["SYNC_VERIFICATION"],
  action: "forge",
  target: "STATUS_UPDATE"
});

const options = {
  hostname: 'localhost',
  port: 3333, // MENEMBAK KE BRIDGE
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(uiData)
  }
};

console.log("🔗 [UI -> BRIDGE -> NEO] Menguji sinkronisasi jalur...");

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    console.log("-------------------------------------------");
    console.log(`📡 STATUS BRIDGE: ${res.statusCode}`);
    console.log(`📥 RESPON AKHIR : ${body}`);
    console.log("-------------------------------------------");
    if (res.statusCode === 200) {
       console.log("🏆 KEMENANGAN! Jalur 'Tritunggal' telah SINKRON.");
    }
  });
});

req.on('error', (e) => console.error("❌ Jalur Terputus: ", e.message));
req.write(uiData);
req.end();
