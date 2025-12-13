import { routeCommand } from "../src/router/commandRouter";

async function run() {
  const result = await routeCommand(
    "REASON::All humans are mortal. Socrates is human."
  );

  if (
    result !==
    "ANSWER(VALID(INFERRED(All humans are mortal. Socrates is human.)))"
  ) {
    throw new Error("ROUTER OUTPUT MISMATCH");
  }

  console.log("COMMAND ROUTER TEST PASSED");
}

run();
