import axios from "axios";
import { promises as fs } from "fs";
import _ from "lodash";

const authorization = process.env.QAWOLF_API_KEY;
const teamId = process.env.QAWOLF_TEAM_ID;

const HELPERS = [
  "assert",
  "assertElement",
  "assertText",
  "expect",
  "faker",
  "getInbox",
  "getValue",
  "launch",
  "launchReplay",
  "uploadReplay",
  "assertNotElement",
  "assertNotText",
  "buildUrl",
  "deleteTeam",
  "getBoundingClientRect",
  "getPlaybarTooltipValue",
  "logIn",
  "logInToFacebook",
  "parseInviteUrl",
  "setFocus",
  "waitForFrameNavigated",
  "bubbleLogin",
  "superblocksLogin",
  "navigateTo",
  "openPopup",
];

function formatHelpers(code) {
  return `const assert = require("assert");
  const { expect } = require("@playwright/test");
  const { assertElement, assertText, getValue } = require("qawolf");
  const faker = require("faker");
  const { getInbox } = require("./getInbox");
  require("dotenv").config();
  
  async function launch({ headless } = { headless: false }) {
    const playwright = require("playwright");
    const { getExecutablePath } = require("@replayio/playwright");
    let browserName = process.env.PLAYWRIGHT_CHROMIUM ? "chromium" : "firefox";
  
    const browser = await playwright[browserName].launch({
      headless,
      timeout: 60000,
    });
    const context = await browser.newContext();
    return { browser, context };
  }

${code.replace(/^/gm, "  ")}

  module.exports = {\n  ${HELPERS.join(",\n  ")}\n};
  `;
}

function formatTest(code) {
  return `const {\n  ${HELPERS.join(",\n  ")}\n} = require("./helpers");

(async () => {
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
      tags {
        name
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

  const helpersCode = await queryFileContent(`helpers.${teamId}`);
  await writeFile("helpers.js", formatHelpers(helpersCode));

  const tests = await queryTests();

  const promises = tests.map(async (test) => {
    if (test.status === "draft") return;

    const testCode = await queryFileContent(`test.${test.id}`);
    await writeFile(`${_.snakeCase(test.name)}.js`, formatTest(testCode));
  });

  await Promise.all(promises);
}

try {
  sync();
} catch (e) {
  console.error(e);
}
