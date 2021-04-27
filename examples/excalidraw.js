const { example } = require("../src/helpers");
const { getBoundingClientRect } = require("../src/dom");

const selectors = {
  canvas: "#canvas",
};

const shortcuts = {
  select: "1",
  box: "2",
  circle: "4",
  arrow: "5",
};

const getCanvasBounds = getBoundingClientRect(selectors.canvas);

example("excalidraw", async (page, { action, step }) => {
  await page.goto("https://excalidraw.com/");

  const bounds = await getCanvasBounds(page);
  const center = {
    y: Math.round(bounds.top + bounds.height / 2),
    x: Math.round(bounds.left + bounds.width / 2),
  };

  await step("Draw a box", async () => {
    await page.press(selectors.canvas, shortcuts.box);
    await page.mouse.move(center.x, center.y);
    await page.mouse.down();
    await page.mouse.move(center.x + 100, center.y + 100);
    await page.mouse.up();
  });

  await step("Draw a circle", async () => {
    await page.press(selectors.canvas, shortcuts.circle);
    await page.mouse.move(center.x + 200, center.y);
    await page.mouse.down();
    await page.mouse.move(center.x + 300, center.y + 100);
    await page.mouse.up();
  });

  await step("Connect square and circle", async () => {
    // Includes a couple waitForTimeouts that are for visible hovers rather than
    // workarounds for scripting issues
    await page.press(selectors.canvas, shortcuts.arrow);
    await page.mouse.move(center.x + 100, center.y + 50);
    await page.waitForTimeout(250);
    await page.mouse.down();
    await page.mouse.move(center.x + 200, center.y + 50);
    await page.waitForTimeout(250);
    await page.mouse.up();
  });

  await action("Move all shapes", async () => {
    await page.press(selectors.canvas, shortcuts.select);

    await step("Select the shapes", async () => {
      await page.mouse.move(center.x - 50, center.y - 50);
      await page.mouse.down();
      await page.mouse.move(center.x + 350, center.y + 150);
      await page.mouse.up();
    });

    await step("Move the shapes", async () => {
      await page.mouse.move(center.x + 50, center.y + 50);
      await page.mouse.down();
      await page.mouse.move(center.x - 100, center.y - 100);
      await page.mouse.up();
    });
  });
});
