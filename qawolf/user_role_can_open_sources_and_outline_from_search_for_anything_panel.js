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
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");

  // go to recording
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);
  await page.click("text=Time Travel");
  await page.click("text=DevTools");
  await page.waitForTimeout(5000); // give DevTools time to fully load

  // assert DevTools loaded
  await assertText(page, "Time Travel");
  await assertText(page, "Network");

  // ensure sources list panel is closed
  const sources = page.locator(".sources-list");
  try {
    await expect(sources).not.toBeVisible();
  } catch (e) {
    // await page.click("text=description");
    await page.click('[data-test-id="AccordionPane-Sources"] [role="button"]');
    await expect(sources).not.toBeVisible();
  }

  // open sources from search for anything tool
  await page.keyboard.press("Control+K");
  await page.click("text=Open Sources");

  // assert sources list panel opened
  await expect(sources).toBeVisible();

  // close panel for next test
  const outline = page.locator(".outline-filter");
  await page.click("text=description");
  await expect(outline).not.toBeVisible();

  // open outline from search for anything tool
  await page.keyboard.press("Control+K");
  await page.click("text=Open Outline");
  await page.click(':text("static.replay.io")');
  await page.click("text=demo");
  await page.click("text=demo-script.js");

  // assert outline pane opened
  await expect(outline).toBeVisible();

  process.exit();
})();
