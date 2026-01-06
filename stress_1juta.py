import asyncio
import aiohttp
import time

URL = "http://10.4.35.107:8080/api/task"
TOTAL_TASKS = 1000000
CONCURRENCY = 1000 # Jumlah gempuran per gelombang

async def send_task(session, i):
    payload = {
        "agent": "OptiAgent",
        "command": "ping",
        "params": {"id": i}
    }
    try:
        async with session.post(URL, json=payload) as resp:
            return resp.status
    except:
        return 500

async def run_test():
    print(f"🚀 INITIATING 1M TASK BOMBARDMENT...")
    start_time = time.time()
    
    connector = aiohttp.TCPConnector(limit=CONCURRENCY)
    async with aiohttp.ClientSession(connector=connector) as session:
        for chunk in range(0, TOTAL_TASKS, CONCURRENCY):
            tasks = [send_task(session, i) for i in range(chunk, chunk + CONCURRENCY)]
            await asyncio.gather(*tasks)
            if chunk % 100000 == 0:
                print(f"📡 Progress: {chunk} tasks dispatched...")

    duration = time.time() - start_time
    print(f"\n--- [STRESS TEST RESULT] ---")
    print(f"Total Tasks: {TOTAL_TASKS}")
    print(f"Duration  : {duration:.2f} seconds")
    print(f"Throughput: {TOTAL_TASKS/duration:.0f} tasks/sec")

if __name__ == "__main__":
    asyncio.run(run_test())
