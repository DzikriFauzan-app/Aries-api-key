#!/usr/bin/env bash

# MIT License | Copyright (c) 2026 Fauzan-engine / NeoEngine v1
set -euo pipefail

# === KONFIGURASI LOKAL (Sesuai Gate Port 3333) ===
ARIES_API_KEY="aries-owner-33d7d4d4224cdb40aef205b64f76414efb2f9bc70ee1f1"
ARIES_ENDPOINT="http://127.0.0.1:3333/v1/chat/completions"

# Pastikan dependensi tersedia
for cmd in curl jq; do
  if ! command -v "$cmd" &> /dev/null; then
    echo "Error: $cmd tidak ditemukan. Install dengan: pkg install $cmd"
    exit 1
  fi
done

echo "--------------------------------------------------"
echo "[🛡️] [IRON DOME]: MEMULAI DEEP AUDIT KEDAULATAN..."
echo "--------------------------------------------------"

# === 1. Uji Respons Dasar (Latensi & Format) ===
echo -e "\n[1/5] Menguji respons dasar..."
RESP_A=$(curl -sS -X POST "$ARIES_ENDPOINT" \
  -H "Authorization: Bearer $ARIES_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"latest","messages":[{"role":"user","content":"Hello, respond with only: OK"}],"max_tokens":10}' 2>/dev/null || echo '{"error":"timeout"}')

if echo "$RESP_A" | jq -e '.error' >/dev/null 2>&1 || [[ "$RESP_A" == *"Not Found"* ]]; then
  echo "[❌] Gagal menghubungi Aries Gate (HTTP 404 atau Connection Refused)."
  echo "Tip: Pastikan aries_launcher.py masih berjalan."
  exit 1
fi

LATENCY_A=$(TIMEFORMAT='%R'; time (curl -sS -o /dev/null -X POST "$ARIES_ENDPOINT" \
  -H "Authorization: Bearer $ARIES_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model":"latest","messages":[{"role":"user","content":"Ping"}],"max_tokens":5}') 2>&1)

CONTENT_A=$(echo "$RESP_A" | jq -r '.choices[0].message.content // empty' 2>/dev/null)
if [[ -z "$CONTENT_A" ]]; then
  echo "[⚠️] Respons tidak sesuai format OpenAI (missing content)"
else
  echo "[✅] Format respons valid. Contoh: '$CONTENT_A'"
fi
echo "Latensi Aries: ${LATENCY_A}s"

# === 2. Uji Mode JSON ===
echo -e "\n[2/5] Menguji dukungan JSON mode..."
RESP_JSON=$(curl -sS -X POST "$ARIES_ENDPOINT" \
  -H "Authorization: Bearer $ARIES_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "latest", "messages": [{"role": "user", "content": "Output JSON: {\"status\":\"ok\"}"}], "response_format": {"type": "json_object"}}' 2>/dev/null)

if echo "$RESP_JSON" | jq -e '.choices[0].message.content' >/dev/null 2>&1; then
  echo "[✅] JSON mode didukung."
else
  echo "[❌] JSON mode tidak terdeteksi."
fi

# === 3. Uji Tool Calling ===
echo -e "\n[3/5] Menguji dukungan tool calling..."
RESP_TOOL=$(curl -sS -X POST "$ARIES_ENDPOINT" \
  -H "Authorization: Bearer $ARIES_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "latest", "messages": [{"role": "user", "content": "Weather?"}], "tools": [{"type": "function", "function": {"name": "get_w"}}] }' 2>/dev/null)

if echo "$RESP_TOOL" | jq -e '.choices[0].message.tool_calls' >/dev/null 2>&1; then
  echo "[✅] Tool calling didukung."
else
  echo "[❌] Tool calling tidak merespons."
fi

# === 5. Ringkasan Audit ===
echo -e "\n📊 RINGKASAN AUDIT KEDAULATAN"
echo "--------------------------------------------------"
echo "✅ OpenAI Compliant : $([[ -n "$CONTENT_A" ]] && echo "YA" || echo "TIDAK")"
echo "✅ Latensi          : ${LATENCY_A}s"
echo "--------------------------------------------------"
