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
  await assertText(page, "Library");

  // go to recording
  await page.click("text=Test Permissions");
  await page.click("text=Time Travel");

  // assert recording loaded
  await assertText(page, "Time Travel");
  await assertText(page, "DevTools");

  // go to DevTools
  await page.click("text=ViewerDevTools");

  // assert DevTools loaded
  await expect(page.locator('[data-test-id="PanelButton-console"]')).toHaveText(
    "Console"
  );

  // open script.js file and breakpoint panel
  await page.keyboard.press("Control+P");
  await page.keyboard.type("s");
  await page.click('#result-list [role="option"]');
  await page.click("text=motion_photos_paused");

  // assert breakpoint panel opened
  await expect(
    page.locator(
      "text=Click on a line number in the editor to add a breakpoint"
    )
  ).toBeVisible();

  // add breakpoint
  await page.waitForTimeout(2000);
  await page.click('[data-test-id="SourceLine-LineNumber-7"]', {
    force: true,
    delay: 500,
  });

  // assert breakpoint added
  await expect(
    page.locator(
      "text=Click on a line number in the editor to add a breakpoint"
    )
  ).not.toBeVisible();
  await expect(page.locator(':text("7:12")').first()).toBeVisible();

  // delete breakpoint click 7 again
  await page.waitForTimeout(3000);
  // await page.click("svg");
  await page.click('[data-test-id="SourceLine-LineNumber-7"]');

  // assert breakpoint deleted
  await expect(
    page.locator(
      "text=Click on a line number in the editor to add a breakpoint"
    )
  ).toBeVisible();
  await expect(page.locator("text=7:12")).not.toBeVisible();

  process.exit();
})();
