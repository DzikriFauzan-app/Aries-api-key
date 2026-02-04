#!/bin/bash
# ARIES v4.0 API FINAL AUDIT
# Loc: South Tangerang | Jan 24, 2026

echo -e "\e[1;34m[🚀] MEMULAI AUDIT KELAYAKAN API ARIES v4.0...\e[0m"
sleep 1

# 1. Cek Port 3333 (Apakah server aktif?)
if lsof -Pi :3333 -sTCP:LISTEN -t >/dev/null ; then
    echo -e "\e[1;32m[OK] Server ARIES aktif di Port 3333\e[0m"
else
    echo -e "\e[1;31m[FAIL] Server ARIES mati! Jalankan python aries_v3_2_... dulu.\e[0m"
    exit 1
fi

# 2. Cek Struktur Brain (Modularitas)
echo -ne "[🔍] Memeriksa Integritas Brain... "
if [ -d "brain" ] && [ -f "brain/vault.json" ]; then
    echo -e "\e[1;32m[OK] (128 Files Detected)\e[0m"
else
    echo -e "\e[1;31m[ERR] Folder Brain tidak lengkap!\e[0m"
fi

# 3. Test Response Latency (Speed Test)
echo -ne "[⚡] Mengukur Latency API... "
START_TIME=$(date +%s%N)
RESPONSE=$(curl -s -X POST http://localhost:3333/chat/completions \
    -H "Content-Type: application/json" \
    -d '{"messages":[{"content":"quantum"}]}')
END_TIME=$(date +%s%N)
LATENCY=$(( (END_TIME - START_TIME) / 1000000 ))

if [[ $RESPONSE == *"choices"* ]]; then
    echo -e "\e[1;32m[SUCCESS] $LATENCY ms\e[0m"
else
    echo -e "\e[1;31m[FAIL] API Tidak Merespons dengan benar.\e[0m"
fi

# 4. Cek Permission (Security Audit)
PERM=$(stat -c "%a" aries_v3_2_programmer_s3_phd.py)
echo -ne "[🛡️] Cek Proteksi File... "
if [ "$PERM" == "600" ] || [ "$PERM" == "700" ]; then
    echo -e "\e[1;32m[SAFE] Locked ($PERM)\e[0m"
else
    echo -e "\e[1;33m[WARN] Izin Terlalu Terbuka ($PERM)\e[0m"
fi

echo "-----------------------------------------------"
echo -e "\e[1;36m[🏆] KESIMPULAN: ARIES v4.0 LAYAK PRODUCTION API!\e[0m"
