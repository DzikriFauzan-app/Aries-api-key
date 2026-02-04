#include <iostream>
#include <vector>
#include <cmath>

struct PlayerState {
    uint32_t id;
    float x, z;
};

struct DeltaPacket {
    uint32_t id;
    float dx, dz;
};

int main() {
    // Simulasi data sebelumnya (Baseline)
    std::vector<PlayerState> lastState = {{1, 10.0f, 10.0f}, {2, 20.0f, 20.0f}};
    
    // Simulasi data baru (Hanya Player 1 yang bergerak)
    std::vector<PlayerState> currentState = {{1, 10.5f, 10.2f}, {2, 20.0f, 20.0f}};
    
    std::vector<DeltaPacket> compressedPacket;

    for(size_t i = 0; i < currentState.size(); ++i) {
        float diffX = currentState[i].x - lastState[i].x;
        float diffZ = currentState[i].z - lastState[i].z;

        // Threshold: Hanya kirim jika perubahan > 0.01 (menghindari jitter)
        if (std::abs(diffX) > 0.01f || std::abs(diffZ) > 0.01f) {
            compressedPacket.push_back({currentState[i].id, diffX, diffZ});
        }
    }

    std::cout << "--- Delta Compression Audit ---" << std::endl;
    std::cout << "Original Entities: " << currentState.size() << std::endl;
    std::cout << "Entities to Send: " << compressedPacket.size() << std::endl;
    std::cout << "Bandwidth Saved: " << (1.0f - (float)compressedPacket.size()/currentState.size()) * 100 << "%" << std::endl;

    return 0;
}
