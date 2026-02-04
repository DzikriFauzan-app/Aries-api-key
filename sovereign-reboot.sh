#!/bin/bash

# Identifikasi Path Absolut
ROOT="/data/data/com.termux/files/home/Aries-api-key"
FEAC_APP="$ROOT/dist/feac"

echo "⚙️ [RESET] Membersihkan port lama..."
pm2 delete all 2>/dev/null

echo "🧠 [ARIES] Mengaktifkan Intelligence Hub..."
# Mengaktifkan Gate dan Bridge dari build produksi
pm2 start "$ROOT/dist/gateway/Gateway.js" --name "Aries-Gate"
pm2 start "$ROOT/dist/feac/commanderBridge.js" --name "Aries-Bridge"

echo "⚙️ [NEO] Mengaktifkan Execution Engine..."
# Menyalakan mesin pengolah 139 agen
pm2 start "$ROOT/bin/neo/neoEngine.js" --name "Neo-Engine"

echo "🌐 [FEAC] Menyajikan UI Dashboard..."
# Memastikan folder dist/feac disajikan sebagai Single Page Application
pm2 serve "$FEAC_APP" 3000 --spa --name "FEAC-UI"

echo "-------------------------------------------"
pm2 status
echo "-------------------------------------------"
echo "🔍 Menunggu inisialisasi port..."
sleep 2
netstat -an | grep -E '3000|3001|3333|8080'
