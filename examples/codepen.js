const { example } = require("../src/helpers");

const box = (key) => ({
  box: `#box-${key}`,
  get pre() {
    return `${this.box} pre[role="presentation"]`;
  },
  get input() {
    return `${this.box} textarea`;
  },
});

const selectors = {
  html: box("html"),
  css: box("css"),
  js: box("js"),
};

const enterText = (field, text) => async (page) => {
  for (let line of text.trim().split("\n")) {
    await page.fill(field, line);
    await page.press(field, "Enter");
  }
};

const waitForPenRender = (callback) => async (page) =>
  new Promise((resolve) =>
    page.on("framenavigated", async (frame) => {
      await callback(frame);
      resolve();
    })
  );

const waitForHeader = waitForPenRender(async (frame) => {
  await frame.waitForSelector('h1:text("Updated by JS")');
});

example("Create a codepen.io", async (page, { action }) => {
  // Go to https://codepen.io/
  await page.goto("https://codepen.io/");

  // Click text="Start Coding"
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://codepen.io/pen/' }*/),
    page.click('text="Start Coding"'),
  ]);

  await page.click(selectors.html.pre);
  await action(
    "Enter HTML",
    enterText(
      selectors.html.input,
      `
<html>
  <body>
    <h1>Welcome to Replay!</h1>
  </body>
</html>
      `
    )
  );

  await page.click(selectors.css.pre);
  await action(
    "Enter CSS",
    enterText(
      selectors.css.input,
      `
h1 {
  font-size: 14pt;
  margin: 0;
}
      `
    )
  );

  await page.click(selectors.js.pre);
  await action(
    "Enter JS",
    enterText(
      selectors.js.input,
      `
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('h1').textContent = "Updated by JS";
});
      `
    )
  );

  await waitForHeader(page);
});
