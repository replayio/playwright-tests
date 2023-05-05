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
  await expect(page.locator("text=Test Permissions")).toBeVisible();

  // go to team
  // await page.click('[title="Test Permissions"]');
  await page.click(`:text("Test Permissions")`);

  // assert replays loaded
  await expect(page.locator("text=Private Recording Test")).toBeVisible();
  await expect(page.locator("text=Time Travel")).toBeVisible();

  // assert replay menus are accessible
  await expect(page.locator("text=more_vert")).toHaveCount(5);

  // bulk edit replays
  await page.click("text=Edit");

  // assert access to bulk edit (checkboxes)
  await expect(page.locator("[type=checkbox]")).toHaveCount(5);
  await expect(page.locator("text=0 item selected")).toBeVisible();
  await page.click("text=Done");

  // assert replays still visible
  await expect(page.locator("text=Private Recording Test")).toBeVisible();
  await expect(page.locator("text=Time Travel")).toBeVisible();

  process.exit();
})();
