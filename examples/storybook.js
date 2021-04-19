const { example } = require("../src/helpers");
const { openStory, selectors } = require("./shared/storybook");

example("Storybook", async (page, { action }) => {
  await page.goto("https://next--storybookjs.netlify.app/official-storybook/");

  await openStory(action, "/Addons/A11y/BaseButton/Label");
  await openStory(action, "/Addons/A11y/BaseButton/Disabled");
  await openStory(action, "/Addons/Backgrounds/");
  await openStory(action, "/Addons/Backgrounds/Overridden", async () => {
    await action("Zoom story", async () => {
      for (let i = 0; i < 5; i++) {
        await page.click(selectors.toolbarButtonByTitle("Zoom in"));
      }
      for (let i = 0; i < 5; i++) {
        await page.click(selectors.toolbarButtonByTitle("Zoom out"));
      }
    });

    await action("Activate tabs", async (page, { log }) => {
      const tabs = [
        "Controls",
        "Actions",
        "Story",
        "Events",
        "Knobs",
        "CSS",
        "Accessibility",
        "Tests",
      ];

      for (let i = 0; i < tabs.length; i++) {
        log("Selecting", tabs[i]);
        await page.click(selectors.tabByTitle(tabs[i]));
        await page.waitForTimeout(250);
      }
    });
  });
});
