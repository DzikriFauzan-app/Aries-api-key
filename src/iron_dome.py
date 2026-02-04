import os
from fastapi import Request, HTTPException

SAFE_PATH_PREFIX = (
    "/chat/stream",
    "/openapi.json",
    "/docs",
    "/redoc",
)

def iron_dome_guard(request: Request):
    # ===============================
    # 0. GLOBAL BOOTSTRAP BYPASS
    # ===============================
    if os.getenv("ARIES_BOOTSTRAP") == "1":
        return

    path = request.url.path

    # 1. IZINKAN PATH AMAN
    if path.startswith(SAFE_PATH_PREFIX):
        return

    # 2. IZINKAN PREFLIGHT
    if request.method == "OPTIONS":
        return

    # 3. IZINKAN INTERNAL FASTAPI / UVICORN
    ua = request.headers.get("user-agent", "")
    if ua.startswith("uvicorn") or ua == "":
        return

    # 4. STRICT SECURITY
    auth = request.headers.get("x-aries-key")
    if not auth:
        raise HTTPException(
            status_code=401,
            detail="IRON DOME: Unauthorized Sovereign Request"
        )
