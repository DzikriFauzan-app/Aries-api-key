import fs from "fs";
import path from "path";
import { textToVector, cosine } from "./vectorUtils";

const DB_PATH = path.join(process.cwd(), "data", "vector_memory.jsonl");

export function storeVector(session: string, text: string) {
  const record = {
    session,
    text,
    vector: textToVector(text),
    ts: Date.now()
  };
  fs.appendFileSync(DB_PATH, JSON.stringify(record) + "\n");
}

export function recallVector(query: string, topK = 3) {
  if (!fs.existsSync(DB_PATH)) return [];

  const qv = textToVector(query);
  const lines = fs.readFileSync(DB_PATH, "utf8").trim().split("\n");

  return lines
    .map(l => JSON.parse(l))
    .map(r => ({
      text: r.text,
      score: cosine(qv, r.vector)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}
