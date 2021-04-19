const { example } = require("../src/helpers");

const selectors = {
  scrollContainer: ".ReactVirtualized__Grid__innerScrollContainer",
  dynamicHeightLabel: "text='Use dynamic row heights?'",
  scrollPlaceholderLabel: "text='Show scrolling placeholder?'",
};

const scrollThroughList = async (page) => {
  await page.click(`${selectors.scrollContainer} > div`);

  await page.press(selectors.scrollContainer, "Home");

  for (let i = 0; i < 10; i++) {
    await page.press(selectors.scrollContainer, "PageDown");
    await page.waitForTimeout(200);
  }
};

example("react-virtualized", async (page, { action }) => {
  await page.goto(
    "https://bvaughn.github.io/react-virtualized/#/components/List"
  );

  await action("Scroll through list", scrollThroughList);

  await action("Toggle options", async () => {
    await page.click(selectors.dynamicHeightLabel);
    await page.click(selectors.scrollPlaceholderLabel);
  });

  await action("Scroll through list", scrollThroughList);
});
