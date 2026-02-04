import json
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from aries_gate.main import aries_inference_engine

router = APIRouter()

@router.post("/chat/completions")
async def sse_chat_endpoint(request: Request):
    data = await request.json()
    messages = data.get("messages", [])
    user_input = messages[-1]["content"] if messages else ""

    # Memanggil Otak Aries
    ai_response = await aries_inference_engine(user_input)

    return JSONResponse(content={
        "id": "chatcmpl-aries-sovereign",
        "object": "chat.completion",
        "model": "aries-v1",
        "choices": [{
            "index": 0,
            "message": {"role": "assistant", "content": ai_response},
            "finish_reason": "stop"
        }]
    })
