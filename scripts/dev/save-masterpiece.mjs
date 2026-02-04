import http from 'http';
import fs from 'fs';

const saveData = JSON.stringify({
  title: "Sovereign_Final_Snapshot",
  genre: "Archive",
  features: ["DISK_PERSISTENCE"],
  action: "forge",
  target: "SAVE_TO_DISK",
  config: { use_agent: "asset_agent" }
});

const options = {
  hostname: 'localhost',
  port: 3333, // Melewati Bridge yang sudah sinkron
  path: '/',
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
};

console.log("💾 [ASSET_AGENT] Mengamankan mahakarya ke penyimpanan fisik...");

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (d) => body += d);
  res.on('end', () => {
    const fileName = `blueprint_genesis_${Date.now()}.json`;
    fs.writeFileSync(fileName, body);
    console.log("-------------------------------------------");
    console.log(`✅ BERHASIL: Aset disimpan sebagai ${fileName}`);
    console.log("-------------------------------------------");
  });
});

req.write(saveData);
req.end();
