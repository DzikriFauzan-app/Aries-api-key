const { execute } = require("./dist/executor");

(async () => {
  const res = await execute({
    session_id: "root",
    user_id: "root",
    input: "who are you"
  });
  console.log(res);
})();
