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
    def ensure_manifest(self, work_path):
        import os
        # XML Murni tanpa karakter tersembunyi
        manifest_content = '<?xml version="1.0" encoding="utf-8"?>\\n'
        manifest_content += '<manifest xmlns:android="http://schemas.android.com/apk/res/android" package="com.neo.aries">\\n'
        manifest_content += '    <application android:label="AriesEngine">\\n'
        manifest_content += '        <activity android:name="AriesMain" android:exported="true">\\n'
        manifest_content += '            <intent-filter>\\n'
        manifest_content += '                <action android:name="android.intent.action.MAIN" />\\n'
        manifest_content += '                <category android:name="android.intent.category.LAUNCHER" />\\n'
        manifest_content += '            </intent-filter>\\n'
        manifest_content += '        </activity>\\n'
        manifest_content += '    </application>\\n'
        manifest_content += '</manifest>'
        
        m_path = os.path.join(work_path, "AndroidManifest.xml")
        if os.path.exists(m_path): os.remove(m_path)
        with open(m_path, "w", encoding="utf-8") as f:
            f.write(manifest_content)

    def sovereign_full_build(self, project_name):
        import subprocess, os
        work_dir = "/sdcard/Buku saya/Fauzan engine/NeoEngine/aries/build_output"
        jar_path = "/data/data/com.termux/files/usr/share/java/android.jar"
        
        try:
            old_cwd = os.getcwd()
            os.chdir(work_dir)
            self.ensure_manifest(work_dir)
            
            print("[*] Stage 1: AAPT")
            subprocess.run(f"aapt package -M AndroidManifest.xml -I {jar_path} -f -F temp.ap_", shell=True, check=True)
            subprocess.run("unzip -o temp.ap_ AndroidManifest.xml", shell=True, check=True)
            
            print("[*] Stage 2: Packaging")
            if os.path.exists(f"{project_name}_unsigned.apk"): os.remove(f"{project_name}_unsigned.apk")
            subprocess.run(f"zip -j {project_name}_unsigned.apk AndroidManifest.xml classes.dex", shell=True, check=True)
            
            print("[*] Stage 3: Signing")
            sign_cmd = f"apksigner sign --ks aries.keystore --ks-pass pass:123456 --min-sdk-version 24 --out {project_name}_ready.apk {project_name}_unsigned.apk"
            subprocess.run(sign_cmd, shell=True, check=True)
            
            os.chdir(old_cwd)
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
        @app.post("/brain/finalize")
        def finalize(req: CodeRequest):
            return {"status": "PROCESSED", "details": self.sovereign_full_build("NeoGame")}
        print("\\n🚀 ARIES SOVEREIGN SYSTEM ONLINE | PORT: 3333")
        uvicorn.run(app, host="0.0.0.0", port=3333)

if __name__ == '__main__':
    agent = AriesAutonomousAgent()
    agent.start_service()
"""

with open(path_file, 'w') as f:
    f.writelines(new_content)
    f.write(class_code)
