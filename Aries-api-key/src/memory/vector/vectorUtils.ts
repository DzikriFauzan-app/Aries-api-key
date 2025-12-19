export function textToVector(text: string): number[] {
  const vec = new Array(64).fill(0);
  for (let i = 0; i < text.length; i++) {
    vec[i % 64] += text.charCodeAt(i) % 31;
  }
  return normalize(vec);
}

function normalize(v: number[]): number[] {
  const mag = Math.sqrt(v.reduce((s, x) => s + x * x, 0)) || 1;
  return v.map(x => x / mag);
}

export function cosine(a: number[], b: number[]): number {
  return a.reduce((s, x, i) => s + x * b[i], 0);
}
