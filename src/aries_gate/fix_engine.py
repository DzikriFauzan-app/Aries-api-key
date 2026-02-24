path = 'src/aries_gate/brain/inference_engine.py'
with open(path, 'r') as f:
    content = f.read()

# Tambahkan pengecekan tipe data agar tidak error lagi
old_logic = 'query = logic_pool["messages"][-1]["content"]'
new_logic = '''
    if isinstance(logic_pool, str):
        query = logic_pool
    else:
        query = logic_pool["messages"][-1]["content"]
'''
content = content.replace(old_logic, new_logic)

with open(path, 'w') as f:
    f.write(content)
