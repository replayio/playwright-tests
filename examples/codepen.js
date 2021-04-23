const { waitForFrameNavigated } = require("../src/dom");
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
  start: "a[href=/pen/]",
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

const waitForPenRender = waitForFrameNavigated(/cdpn.io/);

example("Create a codepen.io", async (page, { step }) => {
  await page.goto("https://codepen.io/");
  await page.click(selectors.start);

  await page.click(selectors.html.pre);
  await step(
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
  await step(
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
  await step(
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

  await step("Wait for Header", async (page) => {
    const frame = await waitForPenRender(page);
    // Leaving this selector in place since its content is driven by the test
    await frame.waitForSelector('h1:text("Updated by JS")');
  });
});
