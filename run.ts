import * as fs from "fs";
import { currentPlatform, spawnChecked } from "./utils";
const { uploadMetadata } = require("./src/metadata");

const Usage = `
Usage: ts-node run.ts options
Options:
  --recordings <path>  File to store recording IDs.
  --container          Use docker container for running tests.
  --env <key> <value>  Set environment variable in tests.
  <test>               Run given test once.

Set $PLAYWRIGHT_CHROMIUM to use chromium.
Set $PLAYWRIGHT_HEADLESS to run tests with a headless browser.
`;

let gRecordingFile: string | undefined;
let gMetadataFile = "../metadata.log";
let gUseContainer = false;

const gChromium = !!process.env.PLAYWRIGHT_CHROMIUM;

const gTests: string[] = [];
const gEnvironment: Record<string, string> = {};
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg == "--recordings") {
    gRecordingFile = process.argv[++i];
  } else if (arg == "--container") {
    gUseContainer = true;
  } else if (arg == "--env") {
    gEnvironment[process.argv[++i]] = process.argv[++i];
  } else if (arg === "--metadata") {
    gMetadataFile = process.argv[++i];
  } else {
    if (fs.existsSync(`${__dirname}/${arg}`)) {
      gTests.push(arg);
    } else {
      console.log(`Unknown test ${arg}`);
      console.log(Usage);
      process.exit(1);
    }
  }
}

if (!gTests.length) {
  console.log(Usage);
  process.exit(1);
}

if (gTests.length && !gRecordingFile) {
  console.log("Recordings file must be specified to run tests");
  console.log(Usage);
  process.exit(1);
}

function mkdirSyncIfNotExists(dir: string) {
  try {
    fs.mkdirSync(dir);
  } catch (e) {}
}

async function runTest(test: string) {
  const server = process.env.RECORD_REPLAY_SERVER || "wss://dispatch.replay.io";

  if (gUseContainer) {
    const tmpRecordingFile = `recordings-${(Math.random() * 1e9) | 0}.log`;
    const tmpRecordingPath = `${__dirname}/${tmpRecordingFile}`;
    if (fs.existsSync(gRecordingFile || "")) {
      fs.copyFileSync(gRecordingFile || "", tmpRecordingPath);
    }

    const script = `
npm i -g typescript ts-node playwright@1.8.1
npm i --save-dev @types/node
ts-node playwright-tests/${test}
`;
    const tmpScriptFile = `run-${(Math.random() * 1e9) | 0}`;
    const tmpScriptPath = `${__dirname}/${tmpScriptFile}`;
    fs.writeFileSync(tmpScriptPath, script);

    const envArgs = [];
    for (const [key, value] of Object.entries(gEnvironment)) {
      envArgs.push("-e", `${key}=${value}`);
    }

    spawnChecked(
      "docker",
      [
        "run",
        "-v",
        `${__dirname}:/playwright-tests`,
        "-e",
        `RECORD_REPLAY_RECORDING_ID_FILE=/playwright-tests/${tmpRecordingFile}`,
        "-e",
        `RECORD_REPLAY_SERVER=${server}`,
        "-e",
        "RECORD_ALL_CONTENT=1",
        "-e",
        "PLAYWRIGHT_HEADLESS=1",
        ...envArgs,
        "recordreplayinc/playwright:latest",
        "bash",
        `/playwright-tests/${tmpScriptFile}`,
      ],
      { stdio: "inherit" }
    );

    if (fs.existsSync(tmpRecordingPath)) {
      fs.copyFileSync(tmpRecordingPath, gRecordingFile || "");
      fs.unlinkSync(tmpRecordingPath);
    }

    fs.unlinkSync(tmpScriptPath);
    return;
  }

  try {
    spawnChecked("ts-node", [`${__dirname}/${test}`], {
      stdio: "inherit",
      env: {
        ...process.env,
        ...gEnvironment,
        RECORD_REPLAY_RECORDING_ID_FILE: gRecordingFile,
        RECORD_REPLAY_RECORDING_METADATA_FILE: gMetadataFile,
        RECORD_REPLAY_SERVER: server,
        RECORD_ALL_CONTENT: "1",
      },
    });

    const recordingId = await uploadMetadata(gRecordingFile, gMetadataFile);
    const replayHost = server.match(/.*dispatch\.(.*)/)![1];

    console.log(
      new Date(),
      `New Replay for ${test} available at https://${replayHost}/view?id=${recordingId}`
    );
  } catch (e: any) {
    const t = new Date();
    console.error(t, "Test failed:", e.message);
    if ("stack" in e && typeof e.stack === "string") {
      e.stack.split("\n").forEach((s: string) => console.error(t, s));
    }
    process.exit(1);
  }
}

async function main() {
  for (const test of gTests) {
    await runTest(test);
  }
}

main();
