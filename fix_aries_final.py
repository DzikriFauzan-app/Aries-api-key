import os

path_file = "/sdcard/Buku saya/Fauzan engine/NeoEngine/aries/aries_perfect.py"
with open(path_file, 'r') as f:
    lines = f.readlines()

new_content = []
for line in lines:
    if "class AriesAutonomousAgent" in line:
        break
    new_content.append(line)

class_code = """
class AriesAutonomousAgent(AriesSovereignFinal):
    def sovereign_full_build(self, project_name):
        import subprocess, os
        # Path absolut untuk referensi
        work_dir = "/sdcard/Buku saya/Fauzan engine/NeoEngine/aries/build_output"
        jar_path = "/data/data/com.termux/files/usr/share/java/android.jar"
        
        try:
            print(f"[*] Switching context to: {work_dir}")
            old_cwd = os.getcwd()
            os.chdir(work_dir) # Pindah ke TKP
            
            # Step 1: AAPT (Sekarang path lokal, tanpa spasi yang mengganggu)
            print("[*] Compiling Binary Manifest...")
            subprocess.run(f"aapt package -M AndroidManifest.xml -I {jar_path} -f -F temp.ap_", shell=True, check=True)
            subprocess.run("unzip -o temp.ap_ AndroidManifest.xml", shell=True, check=True)
            
            # Step 2: Zipping
            print("[*] Packaging APK...")
            subprocess.run(f"zip -j {project_name}_unsigned.apk AndroidManifest.xml classes.dex", shell=True, check=True)
            
            # Step 3: Signing
            print("[*] Signing APK...")
            sign_cmd = f"apksigner sign --ks aries.keystore --ks-pass pass:123456 --min-sdk-version 24 --out {project_name}_ready.apk {project_name}_unsigned.apk"
            subprocess.run(sign_cmd, shell=True, check=True)
            
            os.chdir(old_cwd) # Kembali ke folder semula
            return "SOVEREIGN BUILD SUCCESS"
        except Exception as e:
            if 'old_cwd' in locals(): os.chdir(old_cwd)
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
