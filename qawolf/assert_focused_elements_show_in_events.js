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
  const { page } = await logIn({ userId: 8 });

  // go to TodoMVC replay
  await page.click(
    '[href="/recording/backbonejs-todomvc--c6103fac-79c9-44d0-bf3f-06c00f616c81"]'
  );

  // go to recording network tab
  await page.click("text=DevTools");
  await page.waitForTimeout(2000);
  await page.click("text=info");

  // assert initial network messages
  const events = page.locator(".event");
  await expect(events).toHaveCount(33);

  // set focus
  await expect(page.locator('[title="Start focus edit mode"]')).toBeVisible();
  await page.click('[title="Start focus edit mode"]');
  await setFocus({ handleLocation: "right", moveToX: 900, page });
  await setFocus({ handleLocation: "left", moveToX: 300, page });

  // assert new event count
  await expect(events).toHaveCount(23);

  process.exit();
})();
