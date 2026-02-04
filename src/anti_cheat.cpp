#include <iostream>
#include <vector>
#include <cmath>

struct PlayerMove {
    uint32_t id;
    float lastX, lastZ;
    float newX, newZ;
    double deltaTime;
};

bool validate_move(const PlayerMove& move, float maxSpeed) {
    // Hitung jarak yang ditempuh
    float dx = move.newX - move.lastX;
    float dz = move.newZ - move.lastZ;
    float distanceSq = dx*dx + dz*dz;

    // Hitung jarak maksimum yang diizinkan (Speed + Toleransi Latensi)
    float maxAllowedDist = maxSpeed * (float)move.deltaTime;
    float maxAllowedDistSq = (maxAllowedDist * maxAllowedDist) + 0.5f; // +0.5 toleransi jitter

    // Jika jarak yang ditempuh > jarak yang diizinkan = CHEAT
    return distanceSq <= maxAllowedDistSq;
}

int main() {
    float SERVER_TICK = 0.1f; // Server cek setiap 100ms
    float MAX_PLAYER_SPEED = 5.0f; // 5 meter per detik

    // Kasus 1: Pemain Normal
    PlayerMove normalMove = {1, 0.0f, 0.0f, 0.4f, 0.0f, SERVER_TICK};
    
    // Kasus 2: Hacker Teleport/Speedhack
    PlayerMove hackerMove = {2, 0.0f, 0.0f, 50.0f, 0.0f, SERVER_TICK};

    std::cout << "--- NeoEngine Security Audit ---" << std::endl;
    std::cout << "Player 1 (Normal): " << (validate_move(normalMove, MAX_PLAYER_SPEED) ? "VALID" : "BANNED") << std::endl;
    std::cout << "Player 2 (Hacker): " << (validate_move(hackerMove, MAX_PLAYER_SPEED) ? "VALID" : "BANNED") << std::endl;

    return 0;
}
