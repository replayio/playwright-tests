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
  openPopup
} = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  
  // go to replay
  await page.click(':text("Test Permissions")');
  await page.click(
    '[href="/recording/time-travel--ebf103b3-9b40-4d5b-a9f3-e0c8fe3d4bd5"]'
  );
  await expect(page.locator("#video")).toBeVisible();
  
  // ensure comments open
  await page.click('[data-test-name="ToolbarButton-ReplayInfo"]');
  await page.click('[data-test-name="ToolbarButton-Comments"]');
  
  // confirm first comment exists
  try {
    await expect(
      page.locator(
        'text="Add a comment to the video, a line of code, or a console message."'
      )
    ).not.toBeVisible({
      timeout: 10 * 1000,
    });
  } catch {
    try {
      await page.click('[src="/images/playback-play.svg"]', { timeout: 500 });
    } catch {
      await page.click('[src="/images/playback-refresh.svg"]');
      await page.click('[src="/images/playback-play.svg"]');
    }
    await page.waitForTimeout(500);
    await page.click('[src="/images/playback-pause.svg"]');
    await page.waitForTimeout(1500);
    await page.click("#video #graphics");
    await page.waitForTimeout(5000);
    await page.fill(
      '[data-test-id="leftSidebar"] [contenteditable="true"]',
      "First comment"
    );
    await page.keyboard.press("Enter");
    await expect(page.locator('text="First comment"')).toBeVisible();
  }
  
  // delete leftover comment(s)
  await page.click("text=First comment");
  // await page.click("text=Here is my comment");
  const secondCommentBlock = page.locator('[class^="EditableRemark_Content"]');
  const moreMenu = page.locator(':text("more_vert")');
  
  while ((await secondCommentBlock.count()) > 1) {
    await moreMenu.last().click();
    await page.click("text=Delete comment and replies");
    await page.click("button >> text=Delete comment");
    await page.waitForTimeout(1000);
  }
  
  // start and stop video
  await page.click('[src="/images/playback-play.svg"]', { delay: 300 });
  await page.waitForTimeout(500); // give playhead time to move
  await page.click('[src="/images/playback-pause.svg"]');
  await page.waitForTimeout(1000);
  
  // add comment
  await page.click("#video", { delay: 500, force: true });
  await page.waitForTimeout(1000);
  await page.click('[data-test-name="ContextMenuItem"]:has-text("Add comment")');
  await page.fill('div[contenteditable="true"]', "Here is my comment");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
  
  // assert comment loaded
  await expect(page.locator('text="Here is my comment"')).toBeVisible();
  
  // delete comment
  await page.waitForTimeout(3000);
  await moreMenu.last().click();
  await page.click("text=Delete comment and replies");
  await page.click("button >> text=Delete comment");
  
  // assert comment deleted
  await page.waitForTimeout(2000);
  await expect(page.locator('text="Here is my comment"')).not.toBeVisible({
    timeout: 10 * 1000,
  });
  

  process.exit();
})();