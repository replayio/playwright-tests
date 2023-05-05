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
  await page.click("text=videocam_off");
  await page.click("text=Network");
  await page.waitForTimeout(5000);

  // assert initial network messages
  const messages = page.locator('[role="cell"]');
  await expect(messages).toHaveCount(90);

  // set focus
  await page.click('[title="Start focus edit mode"]');
  await setFocus({ handleLocation: "left", moveToX: 70, page });

  // assert new console message count
  await expect(messages).toHaveCount(5);

  process.exit();
})();
