const { readdirSync } = require("fs");

function getTests() {
  const exclude = ["getInbox.js", "helpers.js", "framer_click_layer.js"];
  const files = readdirSync("./qawolf");
  const tests = files.filter((file) => !exclude.includes(file));
  return tests;
}

async function recordTest(test) {
  const proc = require("child_process").spawnSync("node", [`qawolf/${test}`], {
    cwd: __dirname,
    stdio: "inherit",
  });

  return [test, proc.status];
}

(async () => {
  const tests = getTests();

  let running = 0;
  const int = setInterval(() => {
    if (tests.length === 0) {
      console.log("All tests completed!");
      clearInterval(int);
      return;
    }
    if (running < 5) {
      const test = tests.shift();
      console.log(`Starting ${test}`);
      running++;
      recordTest(test)
        .then(async ([test, status]) => {
          console.log(`Test ${test} ${status ? "failed" : "passed"}`);
        })
        .catch((e) => console.error(`Recording crashed`, e))
        .finally(() => {
          running--;
        });
    }
  }, 100);
})();
