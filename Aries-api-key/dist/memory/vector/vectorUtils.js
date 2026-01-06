"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textToVector = textToVector;
exports.cosine = cosine;
function textToVector(text) {
    const vec = new Array(64).fill(0);
    for (let i = 0; i < text.length; i++) {
        vec[i % 64] += text.charCodeAt(i) % 31;
    }
    return normalize(vec);
}
function normalize(v) {
    const mag = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
    return v.map(x => x / mag);
}
function cosine(a, b) {
    return a.reduce((s, x, i) => s + x * b[i], 0);
}
