#!/usr/bin/env python3
import json
import uuid
import time
from collections import defaultdict
from http.server import HTTPServer, BaseHTTPRequestHandler
import urllib.parse

memory = defaultdict(list)
topics = {
    "quantum": "Qiskit Hadamard H|0>=(|0>+|1>)/√2 CNOT entanglement",
    "hadamard": "H gate creates superposition for quantum computing",
    "kosmologi": "QS 77:8 expansion = Hubble v=H0*d Dark Energy 68%"
}

class AriesHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/chat/completions':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            session_id = str(uuid.uuid4())[:8]
            user_msg = data['messages'][0]['content'].lower()
            
            memory[session_id].append(user_msg)
            if len(memory[session_id]) > 20:
                memory[session_id] = memory[session_id][-20:]
            
            response = f"🤖 ARIES v5.0 | Session: {session_id}"
            response += f" | Context: {len(memory[session_id])} messages"
            
            for topic, info in topics.items():
                if topic in user_msg:
                    response += f" | 💻 {topic.upper()}: {info}"
                    break
            else:
                response += " | 🧠 PhD reasoning active"
            
            if len(memory[session_id]) > 1:
                response += f" | 🔗 Prev: {memory[session_id][-2][:30]}"
            
            result = {
                "choices": [{
                    "message": {"content": response}
                }]
            }
            
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(result).encode())
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    server = HTTPServer(('0.0.0.0', 3333), AriesHandler)
    print("🚀 ARIES v5.0 DIRECT LIVE on http://localhost:3333")
    server.serve_forever()
