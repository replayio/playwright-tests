const { example } = require("../src/helpers");
const { selectors, openStory } = require("./shared/storybook");

example("Storyboook UI", async (page, { action, step }) => {
  await page.goto("https://5ccbc373887ca40020446347-qbeeoghter.chromatic.com/");

  await step("/Avatar/", openStory("/Avatar/"));
  await step("/Avatar/Large", openStory("/Avatar/Large"));
  await step("/Avatar/Small", openStory("/Avatar/Small"));
  await step("/CodeSnippets/", openStory("/CodeSnippets/"));
  await action(
    "/CodeSnippets/Multiple",
    openStory("/CodeSnippets/Multiple", () =>
      step("Select tabs", async () => {
        await page.click(selectors.tabByTitle("Actions"));
        await page.click(selectors.tabByTitle("Story"));
      })
    )
  );
});
