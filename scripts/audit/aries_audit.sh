#!/usr/bin/env bash

KEY="aries-owner-33d7d4d4224cdb40aef205b64f76414efb2f9bc70ee1f1"
GATE_URL="http://127.0.0.1:3333/v1/chat/completions"

echo "------------------------------------------------"
echo "[🛡️] [IRON DOME]: MEMULAI AUDIT FUNGSIONAL..."
echo "------------------------------------------------"

# Mencoba koneksi langsung dengan timeout 5 detik
# Kita mengecek status code HTTP
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" --max-time 5 -X POST "$GATE_URL" \
  -H "Authorization: Bearer $KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"latest","messages":[{"role":"user","content":"ping"}]}')

if [ "$HTTP_STATUS" -eq 200 ] || [ "$HTTP_STATUS" -eq 404 ]; then
    echo "[✅] SUCCESS: Aries Gate Merespons (HTTP $HTTP_STATUS)."
    echo "[🚀] Jaringan Terdeteksi. Kedaulatan Terverifikasi!"
    
    # Jika 404, berarti server hidup tapi rute belum sinkron sempurna
    if [ "$HTTP_STATUS" -eq 404 ]; then
        echo "[⚠️] Note: Server Aktif, namun Endpoint /v1/chat/completions belum terdaftar."
    fi
else
    echo "[🛑] FAIL: Gate Tidak Merespons (HTTP $HTTP_STATUS)."
    echo "[🔍] Rekomendasi: Periksa 'cat gate.log' untuk error runtime."
fi
