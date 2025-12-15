#!/usr/bin/env bash
set -euo pipefail

echo "=================================================="
echo " UNIZAN REPOSITORY INSPECTION (URL MODE)"
echo " HTTPS CLONE | READ-ONLY | FORENSIC"
echo "=================================================="
echo

UNIZAN_URL="https://github.com/DikriFauzan/Unizan.git"
WORKDIR="$HOME/__inspect_unizan_tmp"

echo "[0] PREPARE WORKDIR"
rm -rf "$WORKDIR"
mkdir -p "$WORKDIR"
cd "$WORKDIR"

echo
echo "[1] CLONING REPOSITORY"
echo "--------------------------------------------------"
echo "URL: $UNIZAN_URL"
git clone --depth=1 "$UNIZAN_URL" unizan
cd unizan
echo

echo "[2] ROOT DIRECTORY"
echo "--------------------------------------------------"
pwd
ls -lah
echo

echo "[3] TOP-LEVEL TREE (DEPTH 3)"
echo "--------------------------------------------------"
find . -maxdepth 3 \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  -not -path "./dist*" \
  -not -path "./build*" \
  -not -path "./android/.gradle*" \
  | sed 's|^\./||'
echo

echo "[4] SOURCE DIRECTORIES OVERVIEW"
echo "--------------------------------------------------"
find . -maxdepth 2 -type d \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  | sed 's|^\./||'
echo

echo "[5] POTENTIAL FEAC / ARIES MODULES"
echo "--------------------------------------------------"
find . \
  -type f \
  \( \
    -iname "*feac*" \
    -o -iname "*aries*" \
    -o -iname "*agent*" \
    -o -iname "*reason*" \
    -o -iname "*policy*" \
    -o -iname "*memory*" \
    -o -iname "*router*" \
    -o -iname "*orchestr*" \
  \) \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  | sed 's|^\./||'
echo

echo "[6] DUPLICATED / CONFLICTING FILE NAMES"
echo "--------------------------------------------------"
find . -type f \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  -printf "%f\n" \
  | sort | uniq -d
echo

echo "[7] EXECUTION / BUILD SCRIPTS"
echo "--------------------------------------------------"
find . \
  -type f \
  \( \
    -name "*.sh" \
    -o -name "build.gradle*" \
    -o -name "gradlew*" \
    -o -name "package.json" \
    -o -name "tsconfig.json" \
    -o -name "capacitor.config.*" \
  \) \
  -not -path "./node_modules*" \
  | sed 's|^\./||'
echo

echo "[8] FRONTEND / UI INDICATORS"
echo "--------------------------------------------------"
find . \
  -type f \
  \( \
    -iname "*.tsx" \
    -o -iname "*.jsx" \
    -o -iname "*.vue" \
    -o -iname "index.html" \
  \) \
  -not -path "./node_modules*" \
  | sed 's|^\./||'
echo

echo "[9] BACKEND / ENGINE INDICATORS"
echo "--------------------------------------------------"
find . \
  -type f \
  \( \
    -iname "*.ts" \
    -o -iname "*.js" \
    -o -iname "*.go" \
    -o -iname "*.py" \
  \) \
  -not -path "./node_modules*" \
  | sed 's|^\./||'
echo

echo "[10] SIZE HOTSPOTS (TOP 20 FILES)"
echo "--------------------------------------------------"
find . -type f \
  -not -path "./node_modules*" \
  -not -path "./.git*" \
  -exec du -h {} + \
  | sort -hr | head -n 20
echo

echo "=================================================="
echo " INSPECTION COMPLETE"
echo " TEMP DIR: $WORKDIR"
echo " YOU MAY DELETE IT AFTER COPYING OUTPUT"
echo "=================================================="
