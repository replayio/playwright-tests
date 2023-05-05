import axios from "axios";
import { promises as fs } from "fs";
import _ from "lodash";

const authorization = process.env.QAWOLF_API_KEY;
const teamId = process.env.QAWOLF_TEAM_ID;

function formatHelpers(code) {
  return `  const assert = require("assert");
  const { expect } = require("@playwright/test");
  const { assertElement, assertText, getValue } = require("qawolf");
  const faker = require("faker");
  const { getInbox } = require("./getInbox");
  require("dotenv").config();

  async function runCommand(cmd, { logStdError } = {}) {
    return new Promise((resolve) => {
      const [c, ...args] = cmd.split(" ");
      const proc = require("child_process").spawn(c, args);
      proc.stderr.on("data", (data) => logStdError?.(data.toString("utf-8")));
      proc.on("exit", () => resolve());
    });
  }
  
  async function launch(opts) {
    const playwright = require("playwright");
    let browserName = opts.browser || process.env.PLAYWRIGHT_CHROMIUM ? "chromium" : "firefox";
  
    const browser = await playwright[browserName].launch({
      ...opts,
      headless: "headless" in opts ? opts.headless : false,
      timeout: 60000,
    });
    const context = await browser.newContext();
    return { browser, context };
  }

  const shared = {};

${code.replace(/^/gm, "  ")}

  shared.assertElement = assertElement;
  shared.assertText = assertText;
  shared.getValue = getValue;

  module.exports = shared;
  `;
}

function formatTest(testName, code) {
  // TODO [ryanjduffy]: Fix source files with duplicate imports
  code = code.replace(/extractAppAndPageFromUrl, (?=addEventAddAction)/, "");

  return `const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "${testName}";

${code.replace(/^/gm, "  ")}

  process.exit();
})();`;
}

function hasTag(test, name) {
  return test.tags.find((tag) => tag.name.includes(name));
}

function queryApi(query) {
  return axios("https://app.qawolf.com/api/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "x-qawolf-team-id": teamId,
      authorization,
    },
    data: { query },
  });
}

async function queryFileContent(fileName) {
  const response = await queryApi(`
    query file {
      file(id: "${fileName}") {
        content
      }
    }`);

  return response.data.data.file.content;
}

async function queryTests() {
  const response = await queryApi(`
  query {
    tests(where:{team_id: {equals: "${teamId}"} }) {
      id
      name
      status
      code
      tags {
        name
      }
      steps {
        step {
          id
          name
          code
        }
      }
    }
  }`);

  return response.data.data.tests;
}

async function writeFile(name, content) {
  try {
    await fs.truncate(outputFileName, 0);
  } catch (e) {
    // Probably because the file does not exist yet
  }

  console.log(`writing ${name}`);
  return fs.writeFile(`qawolf/${name}`, content);
}

async function sync() {
  // clear directory to remove old test files
  await fs.rmdir("qawolf", { recursive: true });
  await fs.mkdir("qawolf");

  // copy getInbox helper
  await fs.copyFile(
    ".github/workflows/qawolf/getInbox.js",
    "qawolf/getInbox.js"
  );

  const tests = await queryTests();
  const isHelperStep = (s) => s.step.id === "clgwxzdpk2062345k6meko044m0";
  const helpersCode = tests
    .find((t) => t.steps.some(isHelperStep))
    ?.steps.find(isHelperStep)?.step.code;
  // const helpersCode = await queryFileContent(`clgwxzdpk2062345k6meko044m0`);

  await writeFile("helpers.js", formatHelpers(helpersCode));

  const promises = tests.map(async (test) => {
    if (test.status === "draft") return;

    const testCode = test.steps.find(
      (s) => !isHelperStep(s) && s.step.code.includes("await")
    )?.step.code;

    const filename = _.snakeCase(test.name);
    if (testCode) {
      await writeFile(`${filename}.js`, formatTest(test.name, testCode));
    } else {
      console.error("Didn't find code for", test.name);
    }
  });

  await Promise.all(promises);
}

try {
  sync();
} catch (e) {
  console.error(e);
}
