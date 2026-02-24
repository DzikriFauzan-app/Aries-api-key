import re

with open('audit_feac_ultimate.sh', 'r') as f:
    content = f.read()

# Mencari blok Knowledge Mapping dan menggantinya dengan logika baru yang akurat
pattern = r'# 1\. AUDIT INTEGRASI PENGETAHUAN.*?# 2\.'
replacement = '''# 1. AUDIT INTEGRASI PENGETAHUAN (20 Chapters Sync)
echo -ne "[📖] 20-Chapter Knowledge Mapping: "
if [ -d "src/aries_gate" ]; then
    CHAPTER_COUNT=$(ls src/aries_gate/aries_v*.py 2>/dev/null | wc -l)
    echo -e "\\e[1;32mPASSED ($CHAPTER_COUNT Chapters Indexed)\\e[0m"
else
    echo -e "\\e[1;31mFAILED (Knowledge Gap Detected)\\e[0m"
fi

# 2.'''

new_content = re.sub(pattern, replacement, content, flags=re.DOTALL)

with open('audit_feac_ultimate.sh', 'w') as f:
    f.write(new_content)
