#!/usr/bin/env bash

echo "[🛡️] Menginisialisasi Kedaulatan Aries (Immortal Mode)..."

# 1. Bersihkan sisa-sisa proses
fuser -k 3333/tcp >/dev/null 2>&1 || true
pkill -f aries_launcher.py >/dev/null 2>&1 || true
sleep 1

# 2. Jalankan dengan pengalihan I/O total agar tidak terikat ke terminal
cd /data/data/com.termux/files/home/Aries-api-key
nohup python3 aries_launcher.py </dev/null >gate.log 2>&1 & 

# 3. Lepaskan proses dari session ini (PENTING)
disown

# 4. Tunggu inisialisasi
printf "[⏳] Menstabilkan Port 3333..."
for i in {1..6}; do printf "."; sleep 1; done
echo ""

# 5. Verifikasi Final
if curl -s http://127.0.0.1:3333/v1/chat/completions -X POST -d '{}' | grep -q "detail\|choices"; then
    echo "[✅] KEDAULATAN PULIH: Gate berjalan independen di background."
    echo "[🛡️] Port 3333 siap melayani NeoEngine."
else
    echo "[❌] GAGAL: Periksa gate.log."
    exit 1
fi
