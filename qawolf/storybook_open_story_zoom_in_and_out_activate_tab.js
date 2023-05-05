const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup
} = require("./helpers");

(async () => {
  // helpers
  const selectors = {
    toolbarButtonByTitle: function (title) {
      return `button[title="${title}"]`;
    },
    tabByTitle: function (title) {
      return `button[role="tab"]:text("${title}")`;
    },
    storyByPath: function (path) {
      const parts = path.toLowerCase().split("/");
  
      if (path[0] === "/") parts.shift();
  
      const story = parts.pop();
      return this.storyByItemId(
        story ? `${parts.join("-")}--${story}` : parts.join("-")
      );
    },
    storyByItemId: function (id) {
      return `[data-item-id="${id}"]`;
    },
  };
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://storybooks-official.netlify.app/?path=/story/ui-panel--default");
  
  // open addons/label
  await page.click(':text("A11y")');
  await page.click(':text("BaseButton")');
  await page.click(':text("Label")');
  
  // open addons/disabled
  await page.click(':text("Disabled")');
  
  // zoom in
  for (let i = 0; i < 5; i++) {
    await page.click(selectors.toolbarButtonByTitle("Zoom in"));
  }
  for (let i = 0; i < 5; i++) {
    await page.click(selectors.toolbarButtonByTitle("Zoom out"));
  }
  
  const tabs = ["Story", "Actions", "Events", "Knobs", "CSS Resources", "Accessibility", "Tests"];
  
  // activate tabs
  for (let tab of tabs) {
    await page.click(selectors.tabByTitle(tab));
    await page.waitForTimeout(250);
  }
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();