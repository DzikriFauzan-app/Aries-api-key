#!/usr/bin/env python3
import json, uuid, time
from collections import defaultdict
from http.server import HTTPServer, BaseHTTPRequestHandler

memory = defaultdict(list)
phd_topics = {
    "quantum": "Qiskit Hadamard H|0>=(|0>+|1>)/√2 CNOT entanglement Quantum Volume",
    "hadamard": "H|0>=(|0>+|1>)/√2 creates superposition for parallel computation",
    "kosmologi": "QS 77:8 langit diluaskan=Hubble v=H0d Dark Energy Λ=68%",
    "aries": "v5.0 Long Context PhD Brain | South Tangerang Global Production"
}

class AriesV5(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/chat/completions':
            content_length = int(self.headers['Content-Length'])
            data = json.loads(self.rfile.read(content_length))
            
            session_id = str(uuid.uuid4())[:8]
            msg = data['messages'][0]['content'].lower()
            
            memory[session_id].append(msg)
            if len(memory[session_id]) > 20: memory[session_id] = memory[session_id][-20:]
            
            response = f"🤖 ARIES v5.0 | Session {session_id}"
            response += f" | Context: {len(memory[session_id])} msgs"
            
            for topic, knowledge in phd_topics.items():
                if topic in msg:
                    response += f" | 💻 {topic.upper()}: {knowledge}"
                    break
            else:
                response += " | 🧠 PhD reasoning chain active"
            
            if len(memory[session_id]) > 1:
                response += f" | 🔗 Prev: {memory[session_id][-2][:40]}"
            
            result = {"choices": [{"message": {"content": response}}]}
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
        else:
            self.send_response(404)
            self.end_headers()

print("🚀 ARIES v5.0 LIVE PORT 3333 | Neo Engine 8080 RESPECT!")
server = HTTPServer(('0.0.0.0', 3333), AriesV5)
server.serve_forever()
