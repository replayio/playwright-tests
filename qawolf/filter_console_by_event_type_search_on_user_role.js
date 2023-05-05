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
  await page.click("text=Greater Scott");

  // assert recording loaded
  await assertText(page, "Greater Scott");
  await assertText(page, "DevTools");

  // go to DevTools
  await page.click("text=ViewerDevTools");

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

  // assert DevTools loaded
  await assertText(page, "Console");

  // clear console
  // check if console-filter-toggle is already open
  if (await page.isChecked("#FilterToggle-nodeModules")) {
    await page.click("#FilterToggle-nodeModules");
  }
  await page.click("#FilterToggle-errors");
  await page.click("#FilterToggle-logs");
  await page.waitForTimeout(10 * 1000); // give console elements time to load

  // search for pointerup events
  const logEntries = page.locator('[data-test-name="Message"]');
  await expect(logEntries).toHaveCount(0);
  await page.fill('[placeholder="Filter by event type"]', "pointerup");

  // assert only pointerup events in search area
  await expect(
    page.locator('[title="View pointerdown events"]')
  ).not.toBeVisible();
  await expect(
    page.locator(
      '[data-test-id="EventTypes-event.pointer.pointerup"] [type="checkbox"]'
    )
  ).toBeVisible();

  // enable pointer up filter
  const pointerupCheckbox = page.locator(
    '[data-test-id="EventTypes-event.pointer.pointerup"] input'
  );
  await pointerupCheckbox.check();
  await expect(pointerupCheckbox).toBeChecked();

  const pointerEventText = page.locator(
    '[data-test-name="ExpandablePreview"] :text("PointerEvent")'
  );
  await page.waitForTimeout(5000);
  await expect(pointerEventText).toHaveCount(26);

  // assert pointerup events loaded
  await page.click(
    '[data-search-index="1"] [data-test-name="ExpandablePreview"][tabindex="0"]'
  );
  await page.waitForSelector("text=isTrusted", { timeout: 3 * 60 * 1000 });
  await expect(logEntries).toHaveCount(26);
  await expect(pointerEventText).toHaveCount(27);

  // disable pointer up filter
  await page.click(
    '[data-test-id="ConsoleFilterToggles"] [data-test-id="EventTypes-event.pointer.pointerup"]'
  );

  // assert pointerup events not visible
  await expect(logEntries).toHaveCount(0);
  await expect(pointerEventText).toHaveCount(0);

  process.exit();
})();
