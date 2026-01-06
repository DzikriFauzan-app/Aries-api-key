import os

kernel_path = "src/bridge/ariesKernelConnector.ts"

if os.path.exists(kernel_path):
    with open(kernel_path, 'r') as f:
        content = f.read()

    # Tambahkan Express sederhana di dalam kernel agar port 3000 terbuka
    server_logic = """
import express from 'express';
const kernelApp = express();
kernelApp.use(express.json());
kernelApp.get('/ping', (req, res) => res.send('Aries Kernel Alive'));
kernelApp.post('/chat', (req, res) => {
    console.log("💬 Message Received:", req.body.message);
    res.json({ response: "Aries Brain Connected & Processing." });
});
kernelApp.listen(3000, () => console.log("🧠 Aries Kernel Server Listening on Port 3000"));
"""
    
    if "3000" not in content:
        with open(kernel_path, 'a') as f:
            f.write(server_logic)
        print("✅ Kernel di-patch untuk membuka Port 3000.")
    else:
        print("ℹ️ Port 3000 sepertinya sudah ada di kode.")
else:
    print("❌ File kernel tidak ditemukan!")
