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
  const { browser, context, page } = await logIn({ userId: 6 });

  // assert library loaded
  await assertText(page, "Your Library");
  await assertText(page, "Replay To Do List");
  await assertText(page, "QA Wolf");

  // view example recording
  await page.goto(
    buildUrl(
      "/recording/replay-to-do-list-replay-sample--fc8dade7-d55c-41aa-8f34-8476f809f5d4"
    )
  );

  // assert replay loaded
  await assertText(page, "Replay To Do List");
  await assertText(page, "DevTools");
  await assertText(page, "This is me adding a comment to a line of code");

  // go back to library
  await page.click(".arrowhead-right");
  try {
    await page.click(':text("Your Library")');
  } catch {}

  // assert library loaded
  await assertText(page, "Your Library");
  await assertText(page, "Replay To Do List");
  await assertText(page, "QA Wolf");

  // go to second replay
  await page.goto(
    buildUrl(
      "/recording/framer-replay-example--0ff790cd-81fc-441d-8a33-b570fc7850c4"
    )
  );

  // assert replay loaded
  await assertText(page, "Framer - Replay Example");
  await assertText(page, "DevTools");
  await assertText(page, "sdfdfa");

  process.exit();
})();
