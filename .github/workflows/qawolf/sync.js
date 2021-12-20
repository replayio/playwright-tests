import axios from "axios";
import { promises as fs } from "fs";
import _ from "lodash";

const authorization = process.env.QAWOLF_API_KEY;
const teamId = process.env.QAWOLF_TEAM_ID;

const HELPERS = [
  // library
  "assertElement",
  "assertText",
  "faker",
  "launch",

  // helpers
  "assertNotElement",
  "assertNotText",
  "buildUrl",
  "deleteTeam",
  "getBoundingClientRect",
  "logIn",
  "logInToFacebook",
  "parseInviteUrl",
  "waitForFrameNavigated",
];

function formatHelpers(code) {
  return `const { assertElement, assertText } = require("qawolf");
  const faker = require("faker");
  require("dotenv").config();
  
  async function launch({ headless } = { headless: false }) {
    const playwright = require("@recordreplay/playwright");
    let browserName = process.env.PLAYWRIGHT_CHROMIUM ? "chromium" : "firefox";
  
    const browser = await playwright[browserName].launch({
      headless,
      timeout: 60000,
    });
    const context = await browser.newContext();
    return { browser, context };
  }
  
${code.replace(/^/gm, "  ")}
  
  module.exports = { ${HELPERS.join(",")} };
  `;
}

function formatTest(code) {
  return `const { ${HELPERS.join(",")} } = require("./helpers");

(async () => {
${code.replace(/^/gm, "  ")}

  process.exit();
})();`;
}

function hasTag(test, name) {
  return test.tags.find(({ tags }) =>
    tags.find((tag) => tag.name.includes(name))
  );
}

function queryApi(query) {
  return axios("https://www.qawolf.com/api/graphql", {
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
    query tests {
      tests {
        id
        name
        tags {
          tags {
            name
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
  const helpersCode = await queryFileContent(`helpers.${teamId}`);
  await writeFile("helpers.js", formatHelpers(helpersCode));

  const tests = await queryTests();

  const promises = tests.map(async (test) => {
    if (!hasTag(test, "CI") || !hasTag(test, "Example")) return;

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
