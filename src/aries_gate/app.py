import os, requests
from pathlib import Path
from dotenv import load_dotenv

class AriesGate:
    def __init__(self):
        self.BASE_PATH = Path("/sdcard/Buku saya/Fauzan engine")
        self.load_config()

    def load_config(self):
        env_path = self.BASE_PATH / ".env"
        if env_path.exists():
            load_dotenv(dotenv_path=env_path)
        self.api_key = os.getenv("ARIES_API_KEY")

    def call_api(self, payload):
        """Akses API luar jika dibutuhkan."""
        headers = {"Authorization": f"Bearer {self.api_key}"}
        return f"Akses API Sovereign Aktif (Key: {self.api_key[:4] if self.api_key else 'NONE'}***)"

    def extract_from_source(self, file_path):
        """Ekstraksi teks murni dari sumber ilmu."""
        try:
            if os.path.exists(file_path):
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
                    return f.read()
            return f"⚠️ File tidak ditemukan: {file_path}"
        except Exception as e:
            return f"⚠️ Gagal ekstraksi: {str(e)}"

gate = AriesGate()
