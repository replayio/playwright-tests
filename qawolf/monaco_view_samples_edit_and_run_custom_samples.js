const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // helpers
  const editors = [
    "creating-the-editor-editor-basic-options",
    "creating-the-editor-hard-wrapping",
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
    "creating-the-diffeditor-hello-diff-world",
    "creating-the-diffeditor-multi-line-example",
    "creating-the-diffeditor-inline-diff-example",
    "creating-the-diffeditor-navigating-a-diff",
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
  
  const code =`
  // The Monaco Editor can be easily created, given an
  // empty container and an options literal.
  // Two members of the literal are "value" and "language".
  // The editor takes the full size of its container.
  
  monaco.editor.create(document.getElementById("container"), {
    value: "async function hello() {alert('Hello world!');}",
    language: "javascript"
  })`
  
  const waitForRunner = waitForFrameNavigated(/runner/);
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://microsoft.github.io/monaco-editor/playground.html');
  
  // cycle through examples
  for (const editor of editors) {
    await page.selectOption(selectors.select, editor);
    var frame = await waitForRunner(page);;
    await frame.waitForSelector('.monaco-editor');
  };
  
  // clear input
  await page.click('.monaco-editor');
  
  // seelct all code
  await page.press('.monaco-editor', "Control+a");
  
  // delete code
  await page.press('.monaco-editor', "Backspace");
  
  // add code
  for (let line of code.trim().split("\n")) {
    await page.type('.monaco-editor', line);
  
    // clear any auto-complete dialogs
    await page.press('.monaco-editor textarea.inputarea', "Escape");
    await page.press('.monaco-editor textarea.inputarea', "Enter");
  
    // Clear any auto-inserted content
    await page.press('.monaco-editor textarea.inputarea', "Control+Shift+ArrowRight");
    await page.press('.monaco-editor textarea.inputarea', "Delete");
  
    await page.waitForTimeout(100);
  };
  
  // run code
  await page.click('.tabArea button');
  
  // get frame
  var frame = await (await page.waitForSelector('#runner')).contentFrame();
  
  // assert frame text
  await assertText(frame, "Hello", {selector: ".view-line >> span"})

  process.exit();
})();