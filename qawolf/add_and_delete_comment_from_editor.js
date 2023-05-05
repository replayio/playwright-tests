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
  const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");

  // go to replay
  // await page.click('[title="Test Commenters"]');
  await page.click(':text("Test Commenters")');
  await page.click('text="Test commenter 3"');

  // assert replay loaded
  await assertText(page, "DevTools");
  await assertText(page, "Test commenter 3", { timeout: 60 * 1000 });

  // navigate to comment section
  try {
    await expect(page.locator("'Comments'")).toBeVisible({ timeout: 5000 });
  } catch {
    await page.click(".comments button");
  }

  // ensure comments deleted
  const noComments = page.locator("text=Add a comment to the video");
  const comments = page.locator(':text("more_vert")');
  while (await comments.count()) {
    await comments.last().click();
    await page.click(':text("Delete comment and replies")');
    await page.click('[role="dialog"] button:nth-of-type(2)');
    await page.waitForTimeout(2000);
  }
  await expect(noComments).toBeVisible();

  // open DevTools and demo-script.js
  await page.click("text=ViewerDevTools");
  await page.click(':text("static.replay.io")');
  await page.click("text=demo");
  await page.click("text=demo-script.js");

  // add comment
  await page.hover("text=const buttons", { force: true });
  await page.waitForTimeout(1000);
  const addCommentButton = page.locator('[data-test-name="LogPointToggle"]');
  await addCommentButton.click();
  await page.click('[data-test-name="PointPanel-CancelButton"]');
  await page.waitForTimeout(2000);
  await page.click('[data-test-name="PointPanel-AddCommentButton"]');

  // try {
  //   // retry click comment button if comment doesn't open on first try
  //   await expect(page.locator("text=QA WolfNow")).toBeVisible();
  // } catch {
  //   await page.click('[aria-label="Add comment"]');
  //   await expect(page.locator("text=QA Wolf")).toBeVisible();
  // }

  await page.waitForTimeout(3000);
  await page.keyboard.type("Here is my comment");
  await page.keyboard.press("Enter");

  // assert comment entered
  await expect(page.locator('[title="Show in the Editor"]')).toBeVisible();
  await expect(page.locator(':text("Chris BurtonNowmore_vert")')).toBeVisible();
  await assertText(page, "Here is my comment");

  // delete comment
  await comments.first().click();
  await page.click("text=Delete comment and replies");
  await page.click('[role="dialog"] button >> text=Delete comment');
  await page.click('[title="Close tab"]');

  // assert comment deleted
  await expect(noComments).toBeVisible({ timeout: 5000 });

  await logOut(page);

  process.exit();
})();
