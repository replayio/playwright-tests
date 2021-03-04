import fs from "fs";
import { spawnSync } from "child_process";

const Usage = `
Usage: ts-node run.ts options
Options:
  --update             Force update to playwright browser.
  --recordings <path>  File to store recording IDs.
  <test>               Run given test once.
Browsers are installed at $REPLAY_PLAYWRIGHT_BROWSER, defaulting to $HOME/replay-playwright-browser
`;

let gNeedUpdate = false;
let gRecordingFile: string | undefined;
const gTests: string[] = [];
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i];
  if (arg == "--update") {
    gNeedUpdate = true;
  } else if (arg == "--recordings") {
    gRecordingFile = process.argv[++i];
  } else {
    const test = `${__dirname}/${arg}`;
    if (fs.existsSync(test)) {
      gTests.push(test);
    } else {
      console.log(`Unknown test ${arg}`);
      console.log(Usage);
      process.exit(1);
    }
  }
}

if (!gNeedUpdate && !gTests.length) {
  console.log(Usage);
  process.exit(1);
}

if (gTests.length && !gRecordingFile) {
  console.log("Recordings file must be specified to run tests");
  console.log(Usage);
  process.exit(1);
}

const BrowserDir = process.env.REPLAY_PLAYWRIGHT_BROWSER || `${process.env.HOME}/replay-playwright-browser`;

// This will need updating when we move to a more recent version of playwright.
const BrowserSubdir = `${BrowserDir}/firefox-1225`;

function mkdirSyncIfNotExists(dir: string) {
  try {
    fs.mkdirSync(dir);
  } catch (e) {}
}

function updateBrowser() {
  if (process.platform == "darwin") {
    if (!gNeedUpdate && fs.existsSync(`${BrowserSubdir}/firefox`)) {
      return;
    }

    mkdirSyncIfNotExists(BrowserDir);
    mkdirSyncIfNotExists(BrowserSubdir);
    spawnSync("wget", ["https://replay.io/downloads/macOS-replay-playwright.tar.xz"], {
      cwd: BrowserSubdir,
      stdio: "inherit",
    });
    spawnSync("wget", ["https://replay.io/downloads/macOS-recordreplay.so"], {
      cwd: BrowserSubdir,
      stdio: "inherit",
    });
    spawnSync("tar", ["xf", "macOS-replay-playwright.tar.xz"], { cwd: BrowserSubdir });
  }
}

async function runTest(test: string) {
  if (process.platform == "darwin") {
    const driver = process.env.RECORD_REPLAY_DRIVER || `${BrowserSubdir}/macOS-recordreplay.so`;
    const server = process.env.RECORD_REPLAY_SERVER || "wss://dispatch.replay.io";

    spawnSync("ts-node", [test], {
      stdio: "inherit",
      env: {
        ...process.env,
        PLAYWRIGHT_BROWSERS_PATH: BrowserDir,
        RECORD_REPLAY_DRIVER: driver,
        RECORD_REPLAY_RECORDING_ID_FILE: gRecordingFile,
        RECORD_REPLAY_SERVER: server,
        RECORD_ALL_CONTENT: "1",
      },
    });
  }
}

async function main() {
  updateBrowser();

  for (const test of gTests) {
    await runTest(test);
  }
}

main();
