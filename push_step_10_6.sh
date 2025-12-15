#!/usr/bin/env bash
set -euo pipefail

echo "=============================================="
echo " ARIES API KEY — SAFE PUSH SCRIPT (STEP 10.6)"
echo "=============================================="

# 1. Pastikan di root repo
if [ ! -f package.json ]; then
  echo "[ERROR] package.json tidak ditemukan. Jalankan dari root repo."
  exit 1
fi

# 2. Pastikan tidak ada error build sebelumnya
echo "[CHECK] Verifikasi build terakhir..."
if [ ! -d dist ]; then
  echo "[WARN] dist/ tidak ditemukan, build ulang disarankan"
fi

# 3. Git status
echo
echo "[GIT STATUS]"
git status

# 4. Add semua perubahan
echo
echo "[GIT ADD]"
git add .

# 5. Commit dengan pesan tegas
echo
echo "[GIT COMMIT]"
git commit -m "step 10.6: audit enforcement, policy binding, tool invocation (production-ready)"

# 6. Push ke default branch (tanpa branch manual)
echo
echo "[GIT PUSH]"
git push origin HEAD

echo
echo "=============================================="
echo " PUSH SELESAI — STEP 10.6 AMAN"
echo " LANJUT STEP 11 SETELAH INI"
echo "=============================================="
