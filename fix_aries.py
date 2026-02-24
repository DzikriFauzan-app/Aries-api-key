import os

path_file = "/sdcard/Buku saya/Fauzan engine/NeoEngine/aries/aries_perfect.py"
with open(path_file, 'r') as f:
    lines = f.readlines()

# Cari baris tempat class dimulai dan potong sisanya
new_content = []
for line in lines:
    if "class AriesAutonomousAgent" in line:
        break
    new_content.append(line)

# Tambahkan class yang sudah diperbaiki
class_code = """
class AriesAutonomousAgent(AriesSovereignFinal):
    def sovereign_full_build(self, project_name):
        import subprocess, os
        path = "/sdcard/Buku saya/Fauzan engine/NeoEngine/aries/build_output"
        jar_path = "/data/data/com.termux/files/usr/share/java/android.jar"
        
        try:
            print(f"[*] Starting Build Pipeline for: {project_name}")
            # Menggunakan tanda kutip tunggal di dalam f-string untuk menghindari SyntaxError
            cmd_aapt = f"aapt package -M '{path}/AndroidManifest.xml' -I {jar_path} -f -F '{path}/temp.ap_'"
            subprocess.run(cmd_aapt, shell=True, check=True)
            
            subprocess.run(f"unzip -o '{path}/temp.ap_' AndroidManifest.xml -d '{path}'", shell=True, check=True)
            
            cmd_zip = f"cd '{path}' && zip -j {project_name}_unsigned.apk AndroidManifest.xml classes.dex"
            subprocess.run(cmd_zip, shell=True, check=True)
            
            sign_cmd = f"apksigner sign --ks '{path}/aries.keystore' --ks-pass pass:123456 --min-sdk-version 24 --out '{path}/{project_name}_ready.apk' '{path}/{project_name}_unsigned.apk'"
            subprocess.run(sign_cmd, shell=True, check=True)
            
            return "SOVEREIGN BUILD SUCCESS"
        except Exception as e:
            return f"BUILD ERROR: {str(e)}"

    def start_service(self):
        import uvicorn
        from fastapi import FastAPI
        from pydantic import BaseModel
        
        app = FastAPI()
        class CodeRequest(BaseModel):
            engine: str; feature: str; requirements: str

        @app.post("/brain/generate")
        def generate(req: CodeRequest):
            return {"status": "success", "code": self.coder.generate_component(req.engine, req.feature, req.requirements)}

        @app.post("/brain/finalize")
        def finalize(req: CodeRequest):
            result = self.sovereign_full_build("NeoGame")
            return {"status": "PROCESSED", "details": result}

        print("\\n🚀 ARIES SOVEREIGN SYSTEM ONLINE | PORT: 3333")
        uvicorn.run(app, host="0.0.0.0", port=3333)

if __name__ == '__main__':
    agent = AriesAutonomousAgent()
    agent.build_world()
    agent.start_service()
"""

with open(path_file, 'w') as f:
    f.writelines(new_content)
    f.write(class_code)

print("[*] Aries file repaired successfully.")
