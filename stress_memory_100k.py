import time
import sys

def run_memory_stress():
    print("🧠 ALLOCATING 100K COGNITIVE BLOCKS...")
    count = 100000
    memory_vault = []
    
    start_time = time.perf_counter()
    
    for i in range(count):
        # Simulasi blok memori kognitif Aries
        block = {
            "id": i,
            "vector": [0.123] * 64, # Simulasi data embedding
            "status": "ACTIVE",
            "owner": "AriesCore"
        }
        memory_vault.append(block)
        
    end_time = time.perf_counter()
    duration = end_time - start_time
    
    print(f"✅ Allocation Complete in {duration:.4f} seconds")
    print(f"⚡ Memory Speed: {count/duration:.0f} ops/sec")
    print(f"📦 Total Memory Used: ~{sys.getsizeof(memory_vault) / 1024:.2f} KB (Ref only)")

if __name__ == "__main__":
    run_memory_stress()
