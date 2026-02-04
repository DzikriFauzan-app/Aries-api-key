from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
import sys, os
sys.path.append(os.path.dirname(__file__))

from brain.inference_engine import process

app = FastAPI(title="Aries Gate v1.0")

@app.post("/chat/completions")
async def chat_completions(request: Request):
    data = await request.json()
    messages = data.get("messages", [])
    user_input = messages[-1]["content"] if messages else ""
    
    response = process({"messages": [{"content": user_input}]})
    return JSONResponse({
        "id": "aries-001",
        "object": "chat.completion",
        "model": "aries-brain-v1",
        "choices": [{"message": {"role": "assistant", "content": response[-1]}}]
    })

@app.get("/health")
async def health():
    return {"status": "Aries Gate LIVE", "port": 3333, "brains": "3/29"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3333)
