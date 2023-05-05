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
  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 500 } });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Commenters")');
  await page.click("text=Test Commenter 2");
  
  // assert replay loaded
  await expect(
    page.locator(':text("Test Commenter 2")', { timeout: 2 * 60 * 1000 })
  ).toBeVisible();
  await assertText(page, "DevTools");
  
  // ensure comments deleted
  try {
    await expect(
      page.locator('[class="toolbar-panel-button comments active"]')
    ).toBeVisible({ timeout: 5000 });
  } catch {
    await page.click('[data-test-name="ToolbarButton-Comments"]');
  }
  
  const copyWhenThereAreNoComments = page.locator(':text("Add a comment")');
  while ((await copyWhenThereAreNoComments.count()) < 1) {
    await page.click("text=more_vert");
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button:nth-of-type(2)');
    await page.waitForTimeout(2000);
  }
  await expect(copyWhenThereAreNoComments).toBeVisible();
  
  // add comment by clicking on video
  await page.click("#video", { delay: 100 });
  await page.waitForTimeout(5000);
  await page.keyboard.type("Here is my comment");
  await page.keyboard.press("Enter");
  
  // assert comment
  await assertText(page, "Here is my comment");
  const userQaWolf = page.locator("text=QA Wolf");
  await expect(userQaWolf).toHaveCount(1);
  
  // edit comment
  await page.waitForTimeout(5000);
  await page.click("text=more_vert");
  await page.click("text=Edit comment");
  await page.keyboard.type("Here is my updated comment");
  await page.keyboard.press("Enter");
  
  // assert edited comment
  await assertText(page, "Here is my updated comment");
  
  // enter reply
  await page.waitForTimeout(5000);
  
  await page.click("text=Reply");
  await page.fill(
    'div[contenteditable="true"]',
    "Here is my reply"
  );
  await page.keyboard.press("Enter");
  
  // assert reply
  await assertText(page, "Here is my reply");
  await expect(userQaWolf).toHaveCount(2);
  
  // delete comment and reply
  await page.click("text=more_vert");
  await page.click("text=Delete comment and replies");
  await page.click('[role="dialog"] button >> text=Delete comment');
  
  // assert comments/replies
  await page.waitForTimeout(4000);
  await expect(userQaWolf).toHaveCount(0);
  await expect(copyWhenThereAreNoComments).toHaveCount(1);
  

  process.exit();
})();