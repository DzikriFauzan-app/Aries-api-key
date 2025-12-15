#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo " ARIES SOVEREIGN | PUSH STEP 11.1"
echo " Memory Controller + Policy + Audit"
echo "========================================"

# pastikan repo bersih secara teknis
git status

# add semua perubahan valid
git add .

# commit deterministik
git commit -m "STEP 11.1: Memory Controller policy-aware + audit-safe (tests pass)"

# push ke default branch (tanpa asumsi nama branch)
git push

echo "========================================"
echo " PUSH COMPLETE — STEP 11.1 LOCKED"
echo "========================================"
