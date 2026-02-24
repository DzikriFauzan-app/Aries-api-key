import sys, os

path = os.path.expanduser('~/aries_perfect.py')
with open(path, 'r') as f:
    lines = f.readlines()

new_lines = []
inserted = False
for line in lines:
    if "import json" in line and not inserted:
        new_lines.append("from brain.inference_engine import process\n")
        inserted = True
    # Cari bagian yang biasanya berisi logika 'return' jawaban kaku
    if "return \"**Step-by-Step:**" in line:
        # Kita ganti logika return-nya supaya memanggil 'process'
        new_lines.append("        return process(message)\n")
        continue # Lewati baris lama
    new_lines.append(line)

with open(path, 'w') as f:
    f.writelines(new_lines)
