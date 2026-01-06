import subprocess
import time
import os

def run_colossal_render():
    print("⚔️ INITIATING 'PERFECT WORLD' STRESS TEST: 10,000 ENTITIES ⚔️")
    print("🏗️ Constructing Archosaur City (3D Nodes + Active Logic)...")
    
    scene_path = "perfect_world_stress.tscn"
    with open(scene_path, "w") as f:
        f.write('[gd_scene load_steps=1 format=3]\n')
        f.write('[node name="World" type="Node3D"]\n')
        
        # Injeksi 10.000 objek 3D dengan koordinat acak
        for i in range(10000):
            f.write(f'[node name="Asset_{i}" type="MeshInstance3D" parent="."]\n')
            f.write(f'transform = Transform3D(1,0,0,0,1,0,0,0,1,{i%100}, {i//100}, {i%50})\n')
    
    script_path = "pw_logic.gd"
    with open(script_path, "w") as f:
        f.write('extends SceneTree\n')
        f.write('func _init():\n')
        f.write('    var start_load = Time.get_ticks_msec()\n')
        f.write('    var root = load("res://perfect_world_stress.tscn").instantiate()\n')
        f.write('    var end_load = Time.get_ticks_msec()\n')
        f.write('    print("📦 LOAD_TIME:" + str(end_load - start_load) + "ms")\n')
        f.write('    \n')
        f.write('    var start_process = Time.get_ticks_msec()\n')
        f.write('    # Simulasi memproses logic 10rb entitas (seperti AI NPC)\n')
        f.write('    for child in root.get_children():\n')
        f.write('        child.rotate_y(0.5)\n')
        f.write('    var end_process = Time.get_ticks_msec()\n')
        f.write('    \n')
        f.write('    print("🧠 LOGIC_TIME:" + str(end_process - start_process) + "ms")\n')
        f.write('    print("NEO_PW_STRESS_SUCCESS")\n')
        f.write('    quit()\n')

    print("🎬 Sending to Godot Vulkan/OpenGL Kernel...")
    start_total = time.time()
    
    try:
        process = subprocess.run(
            ["godot", "--display-driver", "headless", "-s", script_path],
            capture_output=True, text=True, timeout=60
        )
        
        total_os_time = time.time() - start_total
        
        if "NEO_PW_STRESS_SUCCESS" in process.stdout:
            lines = process.stdout.split('\n')
            load_t = [l for l in lines if "LOAD_TIME" in l][0]
            logic_t = [l for l in lines if "LOGIC_TIME" in l][0]
            
            print(f"\n✅ ARCHOSAUR RENDERED!")
            print(f"📦 Engine Load (RAM): {load_t.split(':')[1]}")
            print(f"🧠 AI/Logic Processing: {logic_t.split(':')[1]}")
            print(f"⏱️ Total Hardware Latency: {total_os_time:.2f} s")
            print(f"🚀 Density Power: {10000/total_os_time:.0f} assets/sec")
        else:
            print("❌ Engine Throttled/Crashed")
            print(process.stderr)
            
    finally:
        if os.path.exists(scene_path): os.remove(scene_path)
        if os.path.exists(script_path): os.remove(script_path)

if __name__ == "__main__":
    run_colossal_render()
