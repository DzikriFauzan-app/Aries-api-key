#!/bin/bash

echo "🚀 [BOOT] Memulai Prosedur Kebangkitan Sistem..."

# 1. Menyalakan Aries Intelligence (Port 3333/3001)
# Asumsi: script Aries ada di folder utama
pm2 start ../../AriesCore.py --name "Aries-Intelligence" --interpreter python3

# 2. Menyalakan NeoEngine (Port 8080)
# Menjalankan server yang mengontrol 139 agen
pm2 start ../../start_world_gen.py --name "NeoEngine-Execution" --interpreter python3

# 3. Menyalakan FEAC Dashboard (Port 3000/5173)
# Karena ini folder dist, kita gunakan serve atau preview
pm2 serve . 3000 --name "FEAC-UI" --spa

echo "-------------------------------------------"
pm2 status
echo "-------------------------------------------"
echo "🌐 Akses FEAC di: http://localhost:3000"
