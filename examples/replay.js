// Playwright script for inspecting a simple recording.

const { example } = require("../src/helpers");

const selectors = {
  toggle: {
    root: "[role='button'].view-toggle",
    get viewer() {
      return `${this.root} .option >> text="Viewer"`;
    },
    get devtools() {
      return `${this.root} .option >> text="DevTools"`;
    },
  },
  toolbar: {
    root: "#toolbox-toolbar",
    nthButton: function (n) {
      return `${this.root} .toolbar-panel-button:nth-child(${n})`;
    },
    get transcript() {
      return `${this.nthButton(1)} button`;
    },
    get sourceExplorer() {
      return `${this.nthButton(2)} button`;
    },
    get pauseInfo() {
      return `${this.nthButton(3)} button`;
    },
  },
  devtools: {
    welcome: {
      goToFile: "*css=[role=button] >> text=go to file",
      searchFunctions: "*css=[role=button] >> text=search functions",
      findInFiles: "*css=[role=button] >> text=find in files",
      allShortcuts: "*css=[role=button] >> text=show all shortcuts",
    },
    search: {
      input: ".search-field input",
    },
    code: {
      lineNumber: ".CodeMirror-linenumber",
      lineByNumber(number) {
        return `${this.lineNumber}:text("${number}")`;
      },
      hitTooltip: ".static-tooltip",
    },
  },
};

const URL = process.env.RECORD_REPLAY_APP_URL || "https://app.replay.io";

example(
  "Replay",
  process.env.RECORD_REPLAY_API_KEY
    ? {
        context: {
          extraHTTPHeaders: {
            Authorization: `Bearer ${process.env.RECORD_REPLAY_API_KEY}`,
          },
        },
      }
    : undefined,
  async (page, { action, step }) => {
    await page.goto(`${URL}/recording/053e7a46-c023-4843-8787-9b0254c077bf`);
    await step("Switch to Devtools", () =>
      page.click(selectors.toggle.devtools)
    );
    await step("Select source", selectSource("doc_rr_basic.html"));

    // We have to hover and check for breakpoint hits first. Clicking on the
    // breakpoint element first leads to the logpoint being cleared out by the
    // devtools hover logic that runs afterwards.
    //
    // See https://github.com/RecordReplay/devtools/issues/1814
    //
    // There is a second problem where playwight sometimes hover/clicks on line 19
    // instead of line 20. If it hovers on line 19 and then clicks on line 20 then
    // the test will not finish.

    await action("Test breakpoints", async (page, { step }) => {
      // TODO: I _think_ the line hover is missed because the listener is attached
      // in an effect that hasn't fired yet. This brief delay allows time for that
      // to occur but an app fix or alternate approach may be warranted.
      await page.waitForTimeout(250);
      await step(
        "Check breakpoint hits on line 11",
        checkBreakpointHits(11, 10)
      );
      await step("Add breakpoint on line 20", async () => {
        page.hover(selectors.devtools.code.lineByNumber(20));
        page.click(selectors.devtools.code.lineByNumber(20));
      });
      await waitForMessageCount(page, "updateNumber", 10);
      await step(
        "Update breakpoint",
        updateBreakpoint("updateNumber", '"hello", number')
      );
    });

    await step("Jump to Hello 7", jumpToMessage("hello 7"));
    await step("Switch to pause view", () =>
      page.click(selectors.toolbar.pauseInfo)
    );

    // await waitForScopeNode(page, "<this>: Window");
    // await waitForMessageCount(page, "42", 1);
  }
);

function selectSource(url) {
  return async (page) => {
    await page.click(selectors.devtools.welcome.goToFile);
    await page.fill(selectors.devtools.search.input, url);
    await page.press(selectors.devtools.search.input, "Enter");
  };
}

function checkBreakpointHits(line, count) {
  return async (page) => {
    await page.hover(selectors.devtools.code.lineByNumber(line));
    await page.waitForSelector(
      `${selectors.devtools.code.hitTooltip} >> text=${count} hits`
    );
  };
}

async function waitForMessageCount(page, text, count) {
  await waitUntil(page, async () => {
    const messages = await page.$$(".message-body");
    let matchCount = 0;
    for (const msg of messages) {
      const innerText = await msg.innerText();
      if (innerText.includes(text)) {
        matchCount++;
      }
    }
    return matchCount == count;
  });
}

function jumpToMessage(text) {
  return async (page) => {
    const msg = await waitUntil(page, async () => {
      const messages = await page.$$(".message");
      for (const msg of messages) {
        const innerText = await msg.innerText();
        if (innerText.includes(text)) {
          return msg;
        }
      }
      return null;
    });

    await msg.hover();

    const button = await msg.$(".overlay-container");
    await button.dispatchEvent("click");
  };
}

function updateBreakpoint(existingText, newText) {
  return async (page) => {
    await page.dispatchEvent(`.expression >> text=${existingText}`, "click");
    await page.waitForTimeout(200);

    await page.keyboard.press("Meta+A");
    await page.keyboard.press("Delete");
    await page.keyboard.type(newText);
    await page.keyboard.press("Enter");
  };
}

async function selectPauseToolbar(page) {
  // The pause toolbar button doesn't have anything to distinguish it from other toolbar buttons.
  const buttons = await page.$$("#toolbox-toolbar button");
  await buttons[2].dispatchEvent("click");
}

async function waitForScopeNode(page, text) {
  return waitUntil(page, async () => {
    const nodes = await page.$$(".tree-node");
    for (const node of nodes) {
      const innerText = await node.innerText();
      if (innerText.replaceAll("\n", "").includes(text)) {
        return node;
      }
    }
    return null;
  });
}

async function evaluateInConsole(page, text) {
  await page.dispatchEvent(
    ".jsterm-input-container .CodeMirror-scroll",
    "mousedown"
  );
  await page.waitForTimeout(200);

  await page.keyboard.type(text);
  await page.keyboard.press("Enter");
}

async function waitUntil(page, predicate) {
  return await Promise.race([
    new Promise(async (resolve) => {
      while (true) {
        const rv = await predicate();
        if (rv) {
          resolve(rv);
          break;
        }

        await page.waitForTimeout(100);
      }
    }),
    page.waitForTimeout(30000),
  ]);
}
