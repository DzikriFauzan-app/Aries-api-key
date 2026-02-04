import sys
import os
import importlib.util
from fastapi import FastAPI

def manual_load(module_name, file_path, inject_objects=None):
    spec = importlib.util.spec_from_file_location(module_name, file_path)
    module = importlib.util.module_from_spec(spec)
    if inject_objects:
        for key, value in inject_objects.items():
            setattr(module, key, value)
    sys.modules[module_name] = module
    spec.loader.exec_module(module)
    return module

try:
    app_engine = FastAPI(title="Aries Sovereign Gate")
    
    # 1. Load SSE Chat V2
    sse_path = "/data/data/com.termux/files/home/Aries-api-key/src/aries_gate/sse_chat_v2.py"
    sse_chat = manual_load("aries_gate.sse_chat", sse_path, inject_objects={"app": app_engine})
    
    # 2. Daftarkan router SSE secara manual ke rute yang diminta curl/audit
    if hasattr(sse_chat, 'router'):
        app_engine.include_router(sse_chat.router, prefix="/v1")
        print("[✅] Router v1 terdaftar.")

    # 3. Load Main Logic
    main_path = "/data/data/com.termux/files/home/Aries-api-key/src/aries_gate/main.py"
    manual_load("aries_gate.main", main_path, inject_objects={"app": app_engine})

    import uvicorn
    print("[🛡️] GATEWAY TERKONSOLIDASI: Mengudara di Port 3333")
    uvicorn.run(app_engine, host="0.0.0.0", port=3333)

except Exception as e:
    print(f"[❌] Kegagalan Fatal: {e}")
    sys.exit(1)
