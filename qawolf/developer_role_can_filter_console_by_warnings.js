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

  // goto 'Playwright Test: Teams - Airtable'
  await page.click(
    '[href="/recording/playwright-test-teams-airtable--69bdd408-b9bf-49a4-b914-608e92c026ce"]'
  );

  // assert recording loaded
  await assertText(page, "Playwright Test: Teams - Airtable");
  await assertText(page, "DevTools");

  // go to DevTools
  await page.click("text=ViewerDevTools");

  // assert DevTools loaded
  await assertText(page, "Console");

  // make sure the filter menu is expanded
  try {
    await expect(
      page.locator('[data-test-id="EventTypeFilterInput"]')
    ).toBeVisible({ timeout: 10 * 1000 });
  } catch {
    await page.click(
      '[data-test-id="ConsoleMenuToggleButton"][title="Open filter menu"]'
    );
    await expect(
      page.locator('[data-test-id="EventTypeFilterInput"]')
    ).toBeVisible();
  }

  // ensure warnings aren't checked
  const warnings = page.locator('[data-test-message-type="console-warning"]');
  await page.uncheck(
    '[data-test-id="FilterToggle-warnings"] #FilterToggle-warnings'
  );

  // assert warnings loaded
  await expect(warnings).toHaveCount(0);

  // ensure warnings are checked
  await page.check(
    '[data-test-id="FilterToggle-warnings"] #FilterToggle-warnings'
  );

  // assert warnings hid
  await expect(warnings).toHaveCount(20);

  process.exit();
})();
