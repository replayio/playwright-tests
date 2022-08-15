const { readdirSync } = require("fs");
const replay = require("@replayio/replay");

const apiKey = "rwk_dkcLU5trLw9tvbbNukNj0xRVl65iVBj2E0qlnz8TL6v";

function getTests() {
  const exclude = ["getInbox.js", "helpers.js", "framer_click_layer.js"];
  const files = readdirSync("./qawolf");
  const tests = files.filter((file) => !exclude.includes(file));
  return tests;
}

async function recordTest(test) {
  return new Promise((r) => {
    var child = require("child_process").exec(`node qawolf/${test}`);
    child.stdout.pipe(process.stdout);
    child.on("exit", (status) => r([test, status]));
  });
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
          try {
            const recordings = replay.listAllRecordings();
            const lastRecording = recordings[recordings.length - 1];

            const id = await replay.uploadRecording(lastRecording.id, {
              apiKey,
            });

            console.log(`Uploaded ${test} -- ${id}`);
          } catch (e) {
            console.error(`Upload failed`, e);
          }
          running--;
        })
        .catch((e) => console.error(`Recording crashed`, e));
    } else {
    }
  }, 100);
})();
