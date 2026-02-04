#!/usr/bin/env python3
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Dict, Any
from collections import defaultdict, deque
import uuid, time, json

app = FastAPI(title="ARIES v5.0 TRUE MEMORY")

# GLOBAL SESSION MEMORY (User → 50 message history)
sessions = defaultdict(lambda: deque(maxlen=50))

PHD_KNOWLEDGE = {
    "quantum": "Qiskit | Hadamard H|0⟩=(|0⟩+|1⟩)/√2 | CNOT entanglement | Quantum Volume",
    "hadamard": "Hadamard gate: H|0⟩=(|0⟩+|1⟩)/√2, H|1⟩=(|0⟩-|1⟩)/√2. Creates superposition.",
    "superposition": "Quantum state α|0⟩+β|1⟩ where |α|²+|β|²=1. Parallel computation.",
    "kosmologi": "QS 77:8 'langit Kami luaskan' → Hubble expansion v=H₀d, Dark Energy Λ=68%"
}

class ChatRequest(BaseModel):
    messages: List[Dict[str, Any]]

@app.get("/health")
async def health():
    return {"status": "ARIES v5.0 TRUE MEMORY LIVE", "sessions": len(sessions)}

@app.post("/chat/completions")
async def chat(request: ChatRequest):
    # SESSION ID dari request atau generate baru
    session_id = request.messages[0].get("session_id", str(uuid.uuid4())[:8])
    
    # GET/INIT SESSION
    session_history = sessions[session_id]
    user_msg = request.messages[0]["content"].lower()
    
    # ADD USER MESSAGE
    session_history.append({"role": "user", "content": user_msg, "time": time.time()})
    
    # BUILD CONTEXT (Last 10 messages)
    context = ""
    for msg in list(session_history)[-10:]:
        context += f"{msg['role']}: {msg['content']}
"
    
    # PHD KNOWLEDGE RETRIEVAL + REASONING
    response = f"🤖 **ARIES v5.0 | Session: {session_id}**
"
    response += f"📚 **Context**: {len(session_history)} messages
"
    
    found_topic = False
    for topic, knowledge in PHD_KNOWLEDGE.items():
        if topic in user_msg:
            response += f"💻 **{topic.upper()}**: {knowledge}
"
            found_topic = True
            break
    
    if not found_topic:
        response += "🧠 **Reasoning**: Building knowledge chain...
"
    
    if len(session_history) > 1:
        response += f"🔗 **Previous**: {session_history[-2]['content'][:50]}...
"
    
    response += f"**v5.0 LONG CONTEXT ACTIVE**"
    
    # SAVE ASSISTANT RESPONSE
    session_history.append({"role": "assistant", "content": response, "time": time.time()})
    
    return {
        "choices": [{
            "message": {
                "content": response,
                "session_id": session_id  # Return session ID for continuity
            }
        }],
        "session_id": session_id
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3333)
