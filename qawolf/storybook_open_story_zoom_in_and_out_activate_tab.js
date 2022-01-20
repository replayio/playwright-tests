const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

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
  
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://next--storybookjs.netlify.app/official-storybook');
  
  // open addons/label
  await page.click(selectors.storyByPath("/Addons/A11y/BaseButton/Label"));
  
  // open addons/disabled
  await page.click(selectors.storyByPath("/Addons/A11y/BaseButton/Disabled"));
  
  // open addons/backgrounds
  await page.click(selectors.storyByPath("/Addons/Backgrounds/"));
  
  // open addons/backgrounds overridden
  await page.click(selectors.storyByPath("/Addons/Backgrounds/Overridden"));
  
  // zoom in
  for (let i = 0; i < 5; i++) {
    await page.click(selectors.toolbarButtonByTitle("Zoom in"));
  };
  for (let i = 0; i < 5; i++) {
    await page.click(selectors.toolbarButtonByTitle("Zoom out"));
  };
  
  const tabs = [
    "Controls",
    "Actions",
    "Interactions",
    "Story",
    "Tests",
    "Accessibility",
  ];
  
  // activate tabs
  for (let tab of tabs) {
    await page.click(selectors.tabByTitle(tab))
    await page.waitForTimeout(250);
  }
  
  await assertText(page, 'No accessibility violations found.')

  process.exit();
})();