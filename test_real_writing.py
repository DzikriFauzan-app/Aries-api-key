import time
import os

def test_physical_write():
    folder = "test_gen"
    if not os.path.exists(folder): os.makedirs(folder)
    
    print("💾 TESTING PHYSICAL WRITE SPEED (10.000 Files)...")
    start = time.time()
    
    for i in range(10000):
        with open(f"{folder}/logic_{i}.gd", "w") as f:
            f.write(f"extends Node\nfunc _ready():\n    print('Logic unit {i} active')")
            
    duration = time.time() - start
    print(f"\n✅ SUCCESS!")
    print(f"⏱️ Time Taken: {duration:.2f}s")
    print(f"🚀 Real Writing Speed: {10000/duration:.0f} files/sec")

if __name__ == "__main__":
    test_physical_write()
