#include <iostream>
#include <vector>
#include <cstdint>
#include <chrono>
#include <algorithm>

// Standar Industri: Structure of Arrays (SoA) untuk Cache Efficiency
struct EntityManager {
    std::vector<uint32_t> entityIDs;
    std::vector<float> posX, posY, posZ;

    void resize(size_t n) {
        entityIDs.resize(n);
        posX.resize(n); posY.resize(n); posZ.resize(n);
    }
};

// Spatial Grid untuk optimasi collision/query
class SpatialGrid {
    float cellSize;
    int gridSize;
    // Menggunakan flat vector untuk menghindari alokasi pointer yang lambat
    std::vector<std::vector<uint32_t>> cells;

public:
    SpatialGrid(float size, int gridRes) : cellSize(size), gridSize(gridRes) {
        cells.resize(gridRes * gridRes);
    }

    void clear() {
        for(auto& cell : cells) cell.clear();
    }

    void insert(uint32_t id, float x, float z) {
        int ix = static_cast<int>(x / cellSize);
        int iz = static_cast<int>(z / cellSize);
        if(ix >= 0 && ix < gridSize && iz >= 0 && iz < gridSize) {
            cells[iz * gridSize + ix].push_back(id);
        }
    }
};

int main() {
    const int count = 10000;
    EntityManager em;
    em.resize(count);
    
    // Inisialisasi entitas (simulasi posisi acak)
    for(int i = 0; i < count; ++i) {
        em.entityIDs[i] = i;
        em.posX[i] = (float)(i % 100);
        em.posZ[i] = (float)(i / 100);
    }

    SpatialGrid grid(1.0f, 100);
    
    auto start = std::chrono::high_resolution_clock::now();
    
    // Proses krusial: Memasukkan 10.000 entitas ke grid
    grid.clear();
    for(int i = 0; i < count; ++i) {
        grid.insert(em.entityIDs[i], em.posX[i], em.posZ[i]);
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> elapsed = end - start;
    
    std::cout << "Spatial Partitioning 10k Entities: " << elapsed.count() << "s" << std::endl;
    return 0;
}
