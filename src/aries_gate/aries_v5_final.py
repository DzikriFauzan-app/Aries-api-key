from fastapi import FastAPI, Request
from pydantic import BaseModel
from typing import List, Dict
import uvicorn, uuid, time
from collections import defaultdict, deque

app = FastAPI()
sessions = defaultdict(lambda: deque(maxlen=20))

PHD_TOPICS = {
    "quantum": "Qiskit Hadamard H|0⟩=(|0⟩+|1⟩)/√2 CNOT entanglement",
    "hadamard": "H|0⟩=(|0⟩+|1⟩)/√2 creates quantum superposition",
    "kosmologi": "QS 77:8 langit diluaskan = Hubble v=H₀d expansion"
}

class Chat(BaseModel):
    messages: List[Dict]

@app.post("/chat/completions")
async def chat(request: Chat):
    session_id = str(uuid.uuid4())[:8]
    session = sessions[session_id]
    msg = request.messages[0]["content"].lower()
    
    session.append({"role": "user", "msg": msg})
    response = f"🤖 ARIES v5.0 | Session {session_id}
"
    response += f"📚 Context: {len(session)} messages
"
    
    for topic, info in PHD_TOPICS.items():
        if topic in msg:
            response += f"💻 **{topic.upper()}**: {info}
"
            break
    else:
        response += "🧠 Building PhD reasoning chain...
"
    
    if len(session) > 1:
        response += f"🔗 Previous: {session[-2]['msg'][:30]}...
"
    
    session.append({"role": "assistant", "msg": response})
    return {"choices": [{"message": {"content": response}}]}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3333)
