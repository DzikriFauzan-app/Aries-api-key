#!/bin/bash
echo "🧹 [CLEANUP] Membunuh semua proses hantu di port 3001, 3333, 8080..."

# Membunuh paksa proses yang menggunakan port tersebut
fuser -k 3001/tcp 3333/tcp 8080/tcp 3000/tcp 2>/dev/null

echo "♻️ [RESTART] Menghidupkan ulang via PM2..."
pm2 delete all 2>/dev/null

# Jalankan skrip reboot Anda yang tadi
./sovereign-reboot.sh

echo "⏳ Menunggu 3 detik untuk inisialisasi..."
sleep 3

echo "🔍 [VERIFIKASI] Cek siapa yang menduduki port sekarang:"
lsof -i :3001,3333,8080,3000
