const { example } = require("../src/helpers");

const { Excalidraw, shortcuts } = require("./shared/excalidraw");

const selectors = {
  draw: {
    canvas: "#canvas",
  },
  splash: "#eraser-splash",
  editor: {
    title: ".quill[class *= TitleEditor] [contenteditable]",
    content: ".quill[class *= TextEditor] [contenteditable]",
  },
};

function addInput(selector, text) {
  return async (page) => {
    await page.click(selector);
    await page.type(selector, text, { delay: 40 });
  };
}

example("eraser", async (page, { action, step }) => {
  await page.goto("https://app.tryeraser.com/");

  await Promise.all([
    page.waitForSelector(selectors.draw.canvas),
    page.waitForSelector(selectors.splash, { state: "detached" }),
  ]);

  const e = new Excalidraw(selectors.draw.canvas);
  const center = await e.center(page);

  await page.click(selectors.draw.canvas);
  await step("Draw a box", e.box(center.x - 50, center.y - 50, 100, 100));

  await step("Add title", addInput(selectors.editor.title, "Replay Example"));
  await step(
    "Add content",
    addInput(
      selectors.editor.content,
      `## Here is some markdown
> does it work?
It _definitely_ does!`
    )
  );
});
