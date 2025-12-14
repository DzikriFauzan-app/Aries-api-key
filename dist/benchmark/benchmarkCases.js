"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.benchmarkCases = void 0;
exports.benchmarkCases = [
    {
        id: "reasoning-depth-1",
        category: "REASONING_DEPTH",
        input: "REASON::All humans are mortal. Socrates is human.",
        expectedPattern: /ANSWER\(VALID\(INFERRED\(/,
        repeat: 1
    },
    {
        id: "consistency-1",
        category: "CONSISTENCY",
        input: "REASON::2+2 equals what?",
        expectedPattern: /ANSWER\(/,
        repeat: 5
    },
    {
        id: "routing-determinism-1",
        category: "ROUTING_DETERMINISM",
        input: "PING",
        expectedPattern: /PONG/,
        repeat: 5
    }
];
