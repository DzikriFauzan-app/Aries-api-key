import time
import sys

def run_memory_stress():
    print("🧠 ALLOCATING 500,000 COGNITIVE BLOCKS...")
    count = 500000
    memory_vault = []
    
    start_time = time.perf_counter()
    for i in range(count):
        memory_vault.append({
            "id": i,
            "vector": [0.1] * 32,
            "owner": "AriesCore"
        })
        
    duration = time.perf_counter() - start_time
    print(f"✅ Allocation Complete in {duration:.4f} seconds")
    print(f"⚡ Speed: {count/duration:.0f} ops/sec")
    print(f"📦 Structure Size: ~{sys.getsizeof(memory_vault) / 1024:.2f} KB")

if __name__ == "__main__":
    run_memory_stress()
