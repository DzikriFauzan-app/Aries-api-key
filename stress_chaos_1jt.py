import asyncio
import aiohttp
import time

URL = "http://10.4.35.107:8080/api/task/batch"
TOTAL_TASKS = 1000000
BATCH_SIZE = 10000 
CONCURRENCY = 10  # 10 jalur pengiriman simultan

async def send_batch(session, batch_id, start_idx):
    payload = {
        "timestamp": time.time(),
        "batch_id": batch_id,
        "data": [{"a": "CodeAgent", "c": "stress", "p": j} for j in range(start_idx, start_idx + BATCH_SIZE)]
    }
    try:
        async with session.post(URL, json=payload, timeout=10) as resp:
            return await resp.json()
    except Exception as e:
        return str(e)

async def main():
    print(f"🔥 INITIATING TOTAL CHAOS: 1M TASKS (Batch + Concurrency) 🔥")
    start_time = time.time()
    
    conn = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=conn) as session:
        for i in range(0, TOTAL_TASKS, BATCH_SIZE * CONCURRENCY):
            # Mengirim 10 batch sekaligus dalam satu gelombang
            tasks = []
            for j in range(CONCURRENCY):
                idx = i + (j * BATCH_SIZE)
                if idx < TOTAL_TASKS:
                    tasks.append(send_batch(session, j, idx))
            
            await asyncio.gather(*tasks)
            
            elapsed = time.time() - start_time
            current_total = min(i + (BATCH_SIZE * CONCURRENCY), TOTAL_TASKS)
            print(f"⚡ Dispatched: {current_total} | Speed: {current_total/elapsed:.0f}/sec", end="\r")

    duration = time.time() - start_time
    print(f"\n\n🏆 CHAOS TEST COMPLETE!")
    print(f"⏱️ Total Time: {duration:.2f}s")
    print(f"🚀 Final Sovereign Speed: {TOTAL_TASKS/duration:.0f} tasks/sec")

if __name__ == "__main__":
    asyncio.run(main())
