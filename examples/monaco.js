const { waitForFrameNavigated } = require("../src/dom");
const { example } = require("../src/helpers");

const {
  selectors: monacoSelectors,
  addInput,
  clearInput,
} = require("./shared/monaco");

const editors = [
  "creating-the-editor-editor-basic-options",
  "creating-the-editor-hard-wrapping",
  // This sample doesn't use the monaco editor so I've removed it for
  // consistency in the test logic
  // "creating-the-editor-syntax-highlighting-for-html-elements",
  "interacting-with-the-editor-adding-a-command-to-an-editor-instance",
  "interacting-with-the-editor-adding-an-action-to-an-editor-instance",
  "interacting-with-the-editor-revealing-a-position",
  "interacting-with-the-editor-rendering-glyphs-in-the-margin",
  "interacting-with-the-editor-line-and-inline-decorations",
  "interacting-with-the-editor-customizing-the-line-numbers",
  "interacting-with-the-editor-listening-to-mouse-events",
  "interacting-with-the-editor-listening-to-key-events",
  "customizing-the-appearence-exposed-colors",
  "customizing-the-appearence-scrollbars",
  "customizing-the-appearence-tokens-and-colors",
  "creating-the-diffeditor-hello-diff-world",
  "creating-the-diffeditor-multi-line-example",
  "creating-the-diffeditor-inline-diff-example",
  "creating-the-diffeditor-navigating-a-diff",
  "extending-language-services-custom-languages",
  "extending-language-services-completion-provider-example",
  "extending-language-services-codelens-provider-example",
  "extending-language-services-color-provider-example",
  "extending-language-services-symbols-provider-example",
  "extending-language-services-folding-provider-example",
  "extending-language-services-hover-provider-example",
  "extending-language-services-semantic-tokens-provider-example",
  "extending-language-services-configure-javascript-defaults",
  "extending-language-services-configure-json-defaults",
];

const selectors = {
  tabs: ".tabArea",
  get run() {
    return `${this.tabs} button`;
  },
  tabByText(text) {
    return `${this.tabs} .tab >> :text="${text}"`;
  },
  select: ".sample-switcher",
  runner: "#runner",
  runnerContainer: "#container",
};

const waitForRunner = waitForFrameNavigated(/runner/);

example("Monaco Editor", async (page, { action, step }) => {
  await page.goto("https://microsoft.github.io/monaco-editor/playground.html");

  await action("Iterate samples", async (page, { log }) => {
    for (const editor of editors) {
      log("Selecting", editor);
      await page.selectOption(selectors.select, editor);
      const frame = await waitForRunner(page);
      await frame.waitForSelector(monacoSelectors.editor);
    }
  });

  await action("Running custom sample", async () => {
    await step("Clear input", clearInput);

    await step(
      "Add code",
      addInput(
        monacoSelectors.input,
        `
// The Monaco Editor can be easily created, given an
// empty container and an options literal.
// Two members of the literal are "value" and "language".
// The editor takes the full size of its container.

monaco.editor.create(document.getElementById("container"), {
  value: "async function hello() {alert('Hello world!');}",
  language: "javascript"
})`
      )
    );

    await step("Running sample", async (page) => {
      await page.click(selectors.run);
      const frame = await page
        .frames()
        .filter((f) => /runner/.test(f.url()))[0];
      await frame.waitForSelector(monacoSelectors.editor);
    });
  });
});
