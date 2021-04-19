const { example } = require("../src/helpers");
const { selectors, openStory } = require("./shared/storybook");

example("Storyboook UI", async (page, { action }) => {
  await page.goto("https://5ccbc373887ca40020446347-qbeeoghter.chromatic.com/");

  await openStory(action, "/Avatar/");
  await openStory(action, "/Avatar/Large");
  await openStory(action, "/Avatar/Small");
  await openStory(action, "/CodeSnippets/");
  await openStory(action, "/CodeSnippets/Multiple");

  await page.click(selectors.tabByTitle("Actions"));
  await page.click(selectors.tabByTitle("Story"));
});
