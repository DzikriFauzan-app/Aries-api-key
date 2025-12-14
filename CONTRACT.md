# ARIES CORE CONTRACT

## ROUTING
- PING            -> PONG
- REASON::<text>  -> ANSWER(VALID(INFERRED(<text>)))
- CHECK::<text>   -> ANSWER(...)
- MEM_WRITE::k=v  -> MEMORY_WRITE_OK
- MEM_READ::k     -> <value> | MEMORY_NOT_FOUND

## GUARANTEES
- Deterministic output for identical input
- No hidden state between calls (except MemoryStore)
- Router behavior MUST satisfy benchmarkCases.ts

Any violation = BREAKING CHANGE
