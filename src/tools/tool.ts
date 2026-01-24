export interface Tool {
  readonly name: string;
  run(input: string): Promise<string>;
}
