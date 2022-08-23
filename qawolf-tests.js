const { readdirSync } = require("fs");
const fetch = require("node-fetch");

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

  return proc.status;
}

async function pingTestMetrics(
  recordingId, // : string | undefined,
  test // : {
  // id: string;
  // duration: number;
  // recorded: boolean;
  // }
) {
  const runId = process.env.TEST_RUN_ID;
  const webhookUrl = process.env.RECORD_REPLAY_WEBHOOK_URL;

  if (!webhookUrl) {
    console.log(
      "RECORD_REPLAY_WEBHOOK_URL is undefined. Skipping test metrics"
    );
    return;
  }

  if (!runId) {
    console.log("TEST_RUN_ID is undefined. Skipping test metrics");
    return;
  }

  try {
    return await fetch(`${webhookUrl}/api/metrics`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "test.finished",
        recordingId,
        test: {
          ...test,
          runId,
        },
      }),
    });
  } catch (e) {
    console.log("Failed to send test metrics", e);
  }
}

(async () => {
  const tests = getTests();

  while (tests.length) {
    const test = tests.shift();
    console.log(`Starting ${test}`);
    const startTime = Date.now();
    try {
      const status = await recordTest(test);
      console.log(`Test ${test} ${status ? "failed" : "passed"}`);
    } catch (e) {
      console.error(`Recording crashed`, e);
    } finally {
      await pingTestMetrics(undefined, {
        id: test + (process.env.PLAYWRIGHT_CHROMIUM ? "-chromium" : "-firefox"),
        duration: Date.now() - startTime,
        recorded: !process.env.RECORD_REPLAY_NO_RECORD,
      });
    }
  }
})();
