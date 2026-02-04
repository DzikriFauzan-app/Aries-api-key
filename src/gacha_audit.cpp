#include <iostream>
#include <vector>
#include <random>
#include <string>

struct GachaResult {
    std::string itemName;
    bool isRare;
};

class GachaSystem {
    int pityCounter = 0;
    const int PITY_THRESHOLD = 10; // Pastikan dapat item langka di tarikan ke-10

public:
    GachaResult pull() {
        pityCounter++;
        
        // Inisialisasi RNG
        std::random_device rd;
        std::mt19937 gen(rd());
        std::uniform_int_distribution<> dis(1, 100);
        int roll = dis(gen);

        // Logika Pity & Weighted Random
        if (pityCounter >= PITY_THRESHOLD || roll > 95) {
            pityCounter = 0; // Reset pity
            return {"Sayap Naga Emas (SSR)", true};
        }
        
        return {"Ramuan HP (Common)", false};
    }
};

int main() {
    GachaSystem shop;
    std::cout << "--- Gacha Monetization Audit (15 Pulls) ---" << std::endl;

    for (int i = 1; i <= 15; ++i) {
        GachaResult res = shop.pull();
        std::cout << "Pull #" << i << ": " << res.itemName 
                  << (res.isRare ? " [RARE!]" : "") << std::endl;
    }

    return 0;
}
