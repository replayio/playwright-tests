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
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // helpers
  const deleteCommentsAndReplies = async (page) => {
    await page.click("text=Delete comment and replies", {
      force: true,
      delay: 500,
    });
    await page.waitForTimeout(2000);
    await page.click("button >> text=Delete comment");
    // await page.click("text=Start");
  };
  
  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");
  
  // go to replay
  // await page.click('[title="Test Commenters"]');
  await page.click(':text("Test Commenters")');
  await page.click("text=User role non-event comment test");
  await page.waitForTimeout(8000); // wait for page to load
  
  // confirm starter comment exists and no others
  try {
    await expect(page.locator('text="Starter comment"')).toBeVisible();
    // if (page.locator('text="Here is my comment"')) { // NOTE: New change by Replay that only creator can delete their own comments - https://qawolfhq.slack.com/archives/C02GEJCC9JP/p1679370290941079
    //   await page.click(':text("more_vert")');
    //   await deleteCommentsAndReplies(page);
    // }
  } catch {
    try {
      await expect(page.locator('text="Here is my comment"')).not.toBeVisible();
    } catch {
      await page.click('.portal-dropdown-wrapper [type="button"]');
      await deleteCommentsAndReplies(page);
      await page.click(':text("info")');
    }
    // await page.click(':text("ads_clickClick0:06")');
    await page.click("#video");
    await page.fill(".ProseMirror", "Starter comment");
    await page.keyboard.press("Enter");
    await expect(page.locator('text="Starter comment"')).toBeVisible();
  }
  
  // delete leftover comments
  await page.click("text=Starter comment");
  const secondCommentBlock = page.locator('.border-transparent [type="button"]');
  while (await secondCommentBlock.count()) {
    await page.click('.border-transparent [type="button"]');
    await deleteCommentsAndReplies(page);
  }
  
  // advance to last event and resume play head
  await page.click("text=0:02");
  var initialPlayerTime = await getValue(page, ".timeline span");
  expect(initialPlayerTime).toEqual("0:02");
  await page.click(".commands button");
  await page.waitForTimeout(2000);
  await page.click(".commands button");
  await page.waitForTimeout(2000);
  var newPlayerTime = await getValue(page, ".timeline span");
  expect(newPlayerTime).toEqual("0:04");
  
  // add comment
  await page.waitForTimeout(2000);
  await page.click("body");
  await page.click('[data-test-name="ContextMenuItem"]:has-text("Add comment")');
  await page.fill(
    '.CommentCard_Unpublished__CscYc [contenteditable="true"]',
    "Here is my comment"
  );
  await page.keyboard.press("Enter");
  
  // assert comment loaded
  await expect(page.locator('text="Here is my comment"')).toBeVisible();
  
  // delete comment
  await page.waitForTimeout(5000);
  await page.click(':text("more_vert") >> nth=1');
  await deleteCommentsAndReplies(page);
  
  // assert comment deleted
  await page.waitForTimeout(5000); // wait for page to load
  await expect(page.locator('text="Here is my comment"')).not.toBeVisible();
  

  process.exit();
})();