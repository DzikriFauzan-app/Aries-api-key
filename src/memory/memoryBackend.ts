export interface MemoryBackend {
  read(key: string): string | null;
  write(key: string, value: string): void;
  snapshot(): Record<string, string>;
}
