#!/usr/bin/env bash
set -euo pipefail

echo "========================================"
echo " ARIES SOVEREIGN STRUCTURE INSPECTION"
echo " READ-ONLY | NO SIDE EFFECT"
echo "========================================"
echo

# Pastikan dijalankan di root repo ARIES
ROOT="$(pwd)"

echo "[1] ROOT DIRECTORY"
echo "----------------------------------------"
ls -lah
echo

echo "[2] TOP-LEVEL TREE (DEPTH 3)"
echo "----------------------------------------"
find . -maxdepth 3 \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  -not -path "./dist*" \
  -not -path "./build*" \
  | sed 's|^\./||'
echo

echo "[3] SRC DIRECTORY TREE (DEPTH 4)"
echo "----------------------------------------"
if [ -d "./src" ]; then
  find ./src -maxdepth 4 \
    -not -path "./src/**/node_modules*" \
    | sed 's|^\./||'
else
  echo "❌ src/ directory NOT FOUND"
fi
echo

echo "[4] AGENT FILES (STEP-BASED)"
echo "----------------------------------------"
find . \
  -type f \
  \( -iname "*agent*" -o -iname "*step*" \) \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  | sed 's|^\./||'
echo

echo "[5] CORE REASONING / COMMAND FILES"
echo "----------------------------------------"
find . \
  -type f \
  \( \
    -iname "*reason*" \
    -o -iname "*planner*" \
    -o -iname "*command*" \
    -o -iname "*policy*" \
    -o -iname "*memory*" \
  \) \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  | sed 's|^\./||'
echo

echo "[6] API / INTERFACE FILES"
echo "----------------------------------------"
find . \
  -type f \
  \( \
    -iname "*api*" \
    -o -iname "*router*" \
    -o -iname "*controller*" \
    -o -iname "*interface*" \
  \) \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  | sed 's|^\./||'
echo

echo "[7] package.json (CONTENT)"
echo "----------------------------------------"
if [ -f "./package.json" ]; then
  cat ./package.json
else
  echo "❌ package.json NOT FOUND"
fi
echo

echo "========================================"
echo " INSPECTION COMPLETE"
echo " COPY & SEND OUTPUT"
echo "========================================"
