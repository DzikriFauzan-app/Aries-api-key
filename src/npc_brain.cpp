#include <iostream>
#include <vector>
#include <chrono>
#include <cmath>

enum class NPCState { Idle, Agresif, CariHeal, Kembali };

struct NPCComponents {
    std::vector<uint32_t> id;
    std::vector<float> hp;
    std::vector<float> x, z;
    std::vector<NPCState> currentState;
    
    void resize(size_t n) {
        id.resize(n); hp.resize(n);
        x.resize(n); z.resize(n);
        currentState.resize(n, NPCState::Idle);
    }
};

void update_npc_ai(NPCComponents& npc, float playerX, float playerZ, size_t count) {
    for (size_t i = 0; i < count; ++i) {
        // Hitung jarak ke player (Euclidean distance squared - lebih cepat)
        float dx = npc.x[i] - playerX;
        float dz = npc.z[i] - playerZ;
        float distSq = dx*dx + dz*dz;

        // Logika Pengambilan Keputusan (Standard Industri: Branchless-friendly)
        if (npc.hp[i] < 20.0f) {
            npc.currentState[i] = NPCState::CariHeal;
        } else if (distSq < 100.0f) { // Radius 10m (10^2)
            npc.currentState[i] = NPCState::Agresif;
        } else {
            npc.currentState[i] = NPCState::Idle;
        }
    }
}

int main() {
    const int numNPC = 10000;
    NPCComponents npcs;
    npcs.resize(numNPC);

    // Inisialisasi NPC (Simulasi beberapa HP rendah)
    for(int i = 0; i < numNPC; ++i) {
        npcs.id[i] = i;
        npcs.hp[i] = (i % 10 == 0) ? 15.0f : 100.0f; // 10% NPC butuh heal
        npcs.x[i] = (float)(i % 50);
        npcs.z[i] = (float)(i / 50);
    }

    auto start = std::chrono::high_resolution_clock::now();

    // Simulasi Player ada di koordinat (25, 25)
    update_npc_ai(npcs, 25.0f, 25.0f, numNPC);

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end - start;

    std::cout << "NPC AI Brain Update (10k Entities): " << elapsed.count() << "s" << std::endl;
    
    // Audit sample hasil
    std::cout << "Sample NPC [0] State: " << (int)npcs.currentState[0] << " (CariHeal)" << std::endl;
    std::cout << "Sample NPC [1250] State: " << (int)npcs.currentState[1250] << " (Agresif)" << std::endl;

    return 0;
}
