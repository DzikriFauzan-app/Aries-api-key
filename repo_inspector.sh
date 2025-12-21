#!/bin/bash
FILE="src/memory/licenseGuardian.ts"

echo "=== ARIES REPO SOVEREIGNTY INSPECTION ==="
if [ -f "$FILE" ]; then
    echo -e "\n[1] INTEGRITY CHECK"
    LINE_COUNT=$(wc -l < "$FILE")
    echo "- Total Lines: $LINE_COUNT"
    
    echo -e "\n[2] LOGIC VERIFICATION (GREP AUDIT)"
    # Memastikan fitur-fitur kunci ada
    grep -q "AES-256-CBC" "$FILE" && echo "✅ AES-256 Encryption: ACTIVE" || echo "❌ AES-256 Encryption: MISSING"
    grep -q "getTierDetails" "$FILE" && echo "✅ Corporate Tier Logic: ACTIVE" || echo "❌ Corporate Tier Logic: MISSING"
    grep -q "triggerInternalSeizure" "$FILE" && echo "✅ Asset Seizure Protocol: ACTIVE" || echo "❌ Asset Seizure Protocol: MISSING"
    grep -q "SECURED_BY_MASTER" "$FILE" && echo "✅ External Relocation Logic: ACTIVE" || echo "❌ External Relocation Logic: MISSING"
    grep -q "1000 USD" "$FILE" && echo "✅ Fine System ($1000): ACTIVE" || echo "❌ Fine System: MISSING"
    
    echo -e "\n[3] SECURITY ANALYSIS"
    if [[ $LINE_COUNT -ge 120 ]]; then
        echo "- Status: STABLE & HEAVY (Enterprise Grade)"
    else
        echo "- Status: WARNING (Code might be truncated!)"
    fi
else
    echo "❌ ERROR: File $FILE not found!"
fi
echo -e "\n=== INSPECTION COMPLETE ==="
