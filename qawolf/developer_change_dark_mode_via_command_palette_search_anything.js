const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
} = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await expect(page.locator("text=Test Permissions")).toBeVisible();

  // go to replay
  await page.click(':text("Test Team")');
  await page.click(
    '[href="/recording/log-in-and-out-pr-deployment--64837de3-6e11-4cb2-a44d-197f6a8d3d67"]'
  );

  // switch to devtools
  await page.click(':text("ViewerDevTools")');

  // select what to do
  await page.keyboard.press("Control+K");
  await page.fill(
    '[placeholder="What would you like to do?"]',
    "toggle Dark Mode"
  );
  await page.click(':text("Toggle Dark ModeAlt+Shift+T")');

  // reset dark mode
  try {
    await expect(page.locator(".sources-pane")).toHaveCSS(
      "color",
      "rgb(56, 56, 61)"
    );
  } catch {
    await page.keyboard.press("Control+K");
    await page.click(':text("Toggle Dark ModeAlt+Shift+T")');
  }
  await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS(
    "color",
    "rgb(56, 56, 61)"
  );

  // toggle dark mode
  await page.keyboard.press("Control+K");
  await page.click(':text("Toggle Dark ModeAlt+Shift+T")');
  await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS(
    "color",
    "rgb(215, 215, 219)"
  );

  // reset dark mode
  try {
    await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS(
      "color",
      "rgb(56, 56, 61)"
    );
  } catch {
    await page.keyboard.press("Control+K");
    await page.click(':text("Toggle Dark ModeAlt+Shift+T")');
  }
  await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS(
    "color",
    "rgb(56, 56, 61)"
  );

  process.exit();
})();
