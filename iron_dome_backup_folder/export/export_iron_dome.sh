#!/bin/bash

TARGET=$1

if [ -z "$TARGET" ]; then
  echo "Usage: export_iron_dome.sh <TARGET_REPO>"
  exit 1
fi

echo "[IRON DOME] EXPORTING TO $TARGET"

mkdir -p "$TARGET/.iron_dome"
cp -r iron_dome "$TARGET/.iron_dome/"

cat << 'HOOK' > "$TARGET/.git/hooks/pre-commit"
#!/bin/bash
echo "[IRON DOME] Pre-commit guard active"
python .iron_dome/iron_dome_cli.py "$@"
HOOK

chmod +x "$TARGET/.git/hooks/pre-commit"

echo "[IRON DOME] EXPORT SELESAI"
