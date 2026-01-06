import requests
import time

# Pastikan IP sesuai dengan MASTER_IP Master
URL = "http://10.4.35.107:8080/api/task/batch"
TOTAL_TASKS = 1000000
BATCH_SIZE = 10000 

def run_batch_test():
    print(f"🚀 STARTING SOVEREIGN BATCH TEST: 1M TASKS...")
    start_time = time.time()
    
    with requests.Session() as session:
        for i in range(0, TOTAL_TASKS, BATCH_SIZE):
            batch_payload = {
                "timestamp": time.time(),
                "data": [{"a": "CodeAgent", "c": "write", "p": j} for j in range(i, i + BATCH_SIZE)]
            }
            try:
                session.post(URL, json=batch_payload, timeout=5)
                elapsed = time.time() - start_time
                print(f"📦 Dispatched: {i + BATCH_SIZE} | Speed: {(i+BATCH_SIZE)/elapsed:.0f}/sec", end="\r")
            except Exception as e:
                print(f"\n❌ Error: {e}")
                break

    print(f"\n\n✅ 1,000,000 TASKS DEPLOYED!")
    print(f"⏱️ Total Time: {time.time() - start_time:.2f}s")

if __name__ == "__main__":
    run_batch_test()
