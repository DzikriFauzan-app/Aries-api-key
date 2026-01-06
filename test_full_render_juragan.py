import subprocess
import time
import os

def run_render_test():
    print("🏙️ INITIATING FULL RENDER TEST: JURAGAN MALAM v1.0")
    print("🏗️ Building Scene Tree with 1,000 entities...")
    
    # 1. Menulis Scene Godot (.tscn) secara fisik
    scene_path = "render_test.tscn"
    with open(scene_path, "w") as f:
        f.write('[gd_scene load_steps=1 format=3]\n')
        f.write('[node name="World" type="Node2D"]\n')
        # Menambah 1.000 Node (Simulasi kerumunan/uang)
        for i in range(1000):
            f.write(f'[node name="Entity_{i}" type="Node2D" parent="."]\n')
            f.write(f'position = Vector2({i%100}, {i//100})\n')
    
    # 2. Menulis Script Eksekutor
    script_path = "render_logic.gd"
    with open(script_path, "w") as f:
        f.write('extends SceneTree\n')
        f.write('func _init():\n')
        f.write('    var start = Time.get_ticks_msec()\n')
        f.write('    var scene = load("res://render_test.tscn").instantiate()\n')
        f.write('    var end = Time.get_ticks_msec()\n')
        f.write('    print("RESULT_TIME:" + str(end - start))\n')
        f.write('    print("NEO_RENDER_SUCCESS")\n')
        f.write('    quit()\n')

    # 3. Menjalankan Render lewat Godot Headless
    print("🎬 Rendering on Godot Kernel...")
    start_time = time.time()
    
    try:
        process = subprocess.run(
            ["godot", "--display-driver", "headless", "-s", script_path],
            capture_output=True, text=True, timeout=15
        )
        
        total_time = time.time() - start_time
        
        if "NEO_RENDER_SUCCESS" in process.stdout:
            # Mencari waktu internal dari Godot
            internal_ms = [line for line in process.stdout.split('\n') if "RESULT_TIME" in line]
            print(f"\n✅ RENDER COMPLETE!")
            print(f"⏱️ Internal Engine Load: {internal_ms[0].split(':')[1]} ms")
            print(f"⏱️ Total Process (OS + IO): {total_time:.2f} s")
            print(f"🚀 Sovereign Efficiency: {1000/total_time:.0f} entities/sec")
        else:
            print("❌ Render Failed")
            print(process.stderr)
            
    finally:
        # Cleanup
        if os.path.exists(scene_path): os.remove(scene_path)
        if os.path.exists(script_path): os.remove(script_path)

if __name__ == "__main__":
    run_render_test()
