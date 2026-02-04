from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn, json, uuid, time
from typing import List, Dict
from collections import deque

app = FastAPI(title="ARIES v5.0 ENHANCED", version="5.0")

class AriesMemory:
    def __init__(self):
        self.sessions = {}
    
    def get_session(self, session_id):
        if session_id not in self.sessions:
            self.sessions[session_id] = {"history": [], "topics": []}
        return self.sessions[session_id]

memory = AriesMemory()

PHD_KNOWLEDGE = {
    "quantum": """Quantum computing menggunakan qubit dalam superposition |0⟩+|1⟩/√2.
Hadamard gate H|0⟩ = (|0⟩+|1⟩)/√2 menciptakan superposition dasar.
CNOT gate membuat entanglement antar qubit untuk komputasi paralel eksponensial.
Quantum Volume mengukur kemampuan real quantum computer.""",
    "aries": "ARIES v5.0: S3 PhD Math+Programming+Science + 20 Chapters Kosmologi Teologi"
}

class ChatRequest(BaseModel):
    messages: List[Dict]

@app.post("/chat/completions")
async def chat(request: ChatRequest):
    session_id = str(uuid.uuid4())[:8]
    session = memory.get_session(session_id)
    user_msg = request.messages[0]["content"].lower()
    
    # Reasoning chain
    reasoning = f"🧠 SESSION {session_id} | "
    response = "🤖 **ARIES v5.0 PhD Reasoning**: "
    
    # Knowledge retrieval
    for topic, knowledge in PHD_KNOWLEDGE.items():
        if topic in user_msg:
            response += f"
**{topic.upper()}**: {knowledge}"
            reasoning += f"FOUND {topic} | "
    
    # Context awareness
    if len(session["history"]) > 0:
        response += f"
📚 **Memory**: {len(session['history'])} messages | Continuing conversation"
        reasoning += f"CONTEXT {len(session['history'])} | "
    
    session["history"].append(user_msg)
    if len(session["history"]) > 20:  # Long context limit
        session["history"] = session["history"][-20:]
    
    return {
        "choices": [{"message": {"content": response + reasoning}}]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3333)
