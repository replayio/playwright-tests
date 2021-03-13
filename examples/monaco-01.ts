import { it, expect } from "@playwright/test";

it("is a basic test with the page", async ({ page }) => {
  await page.goto("https://microsoft.github.io/monaco-editor/playground.html");

  await page.click("//div[normalize-space(.)='    language: \"javascript\"']");

  await page.press(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    "ArrowUp"
  );

  await page.press(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    "Meta+ArrowRight"
  );

  await page.press(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    "ArrowLeft"
  );

  await page.press(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    "ArrowLeft"
  );

  await page.fill(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    ``
  );

  // Fill textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]
  await page.type(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    `
// The Monaco Editor can be easily created, given an
// empty container and an options literal.
// Two members of the literal are "value" and "language".
// The editor takes the full size of its container.

monaco.editor.create(document.getElementById("container"), {
value: "function hello() {alert('Hello world!');}",
language: "javascript"
`
  );

  await page.press(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    "ArrowUp"
  );

  await page.press(
    'textarea[aria-label="Editor content;Press Alt+F1 for Accessibility Options."]',
    "ArrowUp"
  );

  await page.click('button[aria-label="Press CMD + return to run the code."]');
});
