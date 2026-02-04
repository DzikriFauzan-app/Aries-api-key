import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict
import uuid, time
from collections import defaultdict, deque

app = FastAPI()
memory = defaultdict(list)

topics = {
    "quantum": "Qiskit Hadamard H gate creates superposition (|0>+|1>)/sqrt(2)",
    "hadamard": "H|0> = (|0> + |1>)/sqrt(2), H|1> = (|0> - |1>)/sqrt(2)",
    "kosmologi": "QS 77:8 expansion = Hubble law v=H0*d"
}

class ChatRequest(BaseModel):
    messages: List[Dict]

@app.post("/chat/completions")
async def chat(request: ChatRequest):
    session_id = str(uuid.uuid4())[:8]
    user_msg = request.messages[0]["content"].lower()
    
    memory[session_id].append(user_msg)
    if len(memory[session_id]) > 20:
        memory[session_id] = memory[session_id][-20:]
    
    response = "ARIES v5.0 | Session: " + session_id
    response += " | Context: " + str(len(memory[session_id])) + " messages"
    
    for topic, info in topics.items():
        if topic in user_msg:
            response += " | " + topic.upper() + ": " + info
            break
    
    if len(memory[session_id]) > 1:
        response += " | Previous: " + memory[session_id][-2][:30]
    
    memory[session_id].append("assistant: " + response)
    return {"choices": [{"message": {"content": response}}]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3333)
