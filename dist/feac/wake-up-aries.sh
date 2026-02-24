#!/bin/bash

# Define Absolute Path
ROOT_DIR="/data/data/com.termux/files/home/Aries-api-key"
FEAC_DIST="$ROOT_DIR/dist/feac"

echo "🌌 [GENESIS] Membangkitkan Sovereign Ecosystem dari Root..."

# Bersihkan proses lama agar tidak bentrok
pm2 delete Aries-Gate Aries-Bridge Neo-Engine 2>/dev/null

# 1. Aktifkan Gate (Port 3001)
pm2 start "$ROOT_DIR/dist/gateway/Gateway.js" --name "Aries-Gate"

# 2. Aktifkan Bridge (Port 3333)
pm2 start "$ROOT_DIR/dist/feac/commanderBridge.js" --name "Aries-Bridge"

# 3. Aktifkan NeoEngine (Port 8080)
pm2 start "$ROOT_DIR/bin/neo/neoEngine.js" --name "Neo-Engine"

# 4. Refresh FEAC UI (Port 3000)
pm2 delete FEAC-UI 2>/dev/null
pm2 serve "$FEAC_DIST" 3000 --name "FEAC-UI" --spa

echo "-------------------------------------------"
pm2 status
echo "-------------------------------------------"
echo "✅ Jalur Komunikasi:"
echo "🧠 Aries Bridge : http://localhost:3333"
echo "⚙️ Neo Engine   : http://localhost:8080"
echo "🌐 FEAC UI      : http://localhost:3000"
