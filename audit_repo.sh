#!/bin/bash

echo "--- Aries GitHub Repository Audit ---"

# 1. Cek .gitignore
if [ ! -f .gitignore ]; then
    echo "[!] .gitignore tidak ditemukan! Membuat file baru..."
    echo "spatial_audit" >> .gitignore
    echo "npc_audit" >> .gitignore
    echo "security_audit" >> .gitignore
    echo "warden_audit" >> .gitignore
    echo "net_audit" >> .gitignore
    echo "delta_audit" >> .gitignore
    echo "stress_audit" >> .gitignore
    echo "db_audit" >> .gitignore
    echo "trans_audit" >> .gitignore
    echo "gacha_audit" >> .gitignore
    echo "*.o" >> .gitignore
    echo "bin/" >> .gitignore
    echo ".env" >> .gitignore
fi

# 2. Strukturisasi Folder
echo "[+] Merapikan struktur folder..."
mkdir -p src tests docs bin

# Pindahkan hasil audit tadi ke folder docs agar rapi di GitHub
mv aries_ai_audit/results/*.cpp src/ 2>/dev/null
mv aries_ai_audit/scenarios/*.txt docs/ 2>/dev/null

echo "[+] Audit Selesai. Gunakan 'git status' untuk melihat perubahan."
