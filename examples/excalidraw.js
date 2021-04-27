const { example } = require("../src/helpers");

const { Excalidraw, shortcuts } = require("./shared/excalidraw");

const selectors = {
  canvas: "#canvas",
};

example("excalidraw", async (page, { action, step }) => {
  await page.goto("https://excalidraw.com/");

  const e = new Excalidraw(selectors.canvas);
  const center = await e.center(page);

  await step("Draw a box", e.box(center.x, center.y, 100, 100));
  await step(
    "Draw a circle",
    e.circle(center.x + 250, center.y + 50, 100, 100)
  );
  await step(
    "Connect square and circle",
    e.arrow(center.x + 100, center.y + 50, center.x + 200, center.y + 50)
  );

  await action("Move all shapes", async () => {
    await page.press(selectors.canvas, shortcuts.select);
    await step(
      "Select",
      e.drag(center.x - 50, center.y - 50, center.x + 350, center.y + 150)
    );
    await step(
      "Move",
      e.drag(center.x + 50, center.y + 50, center.x - 100, center.y - 100)
    );
  });
});
