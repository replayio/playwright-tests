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
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Commenters")');
  await page.click(
    '[href="/recording/test-commenter-1--e232ef8c-4b3e-49f1-a624-9e77a300ddb7"]'
  );
  
  // assert replay loaded
  await assertText(page, "Test Commenter 1");
  await assertText(page, "DevTools");
  
  // ensure comments deleted
  const comments = page.locator("text=comments");
  if ((await comments.count()) < 1) {
    await page.click("text=forum");
  }
  
  const startConvo = page.locator(
    ":text('Add a comment to the video, a line of code, or a console message.')"
  );
  while ((await startConvo.count()) < 1) {
    await page.click("text=more_vert");
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button >> text=Delete comment');
    await page.waitForTimeout(2000);
  }
  await expect(startConvo).toBeVisible();
  
  // open DevTools
  await page.click("text=ViewerDevTools");
  
  // hide video to expose all of console
  await page.click("text=videocam_off");
  
  // enter comment from console
  await page.hover(
    '[data-test-name="Message"] :text("Welcome to Replay!👋 Here are some things to try:")',
    { force: true }
  );
  await page.click(
    '[data-test-message-type="console-log"] [data-test-id="ConsoleMessageHoverButton"]'
  );
  await page.hover(':text("const buttons")');
  await page.waitForTimeout(3000);
  await page.click('[data-test-id="Source-3"] [data-test-name="LogPointToggle"]'); // clicks the + button to the left 
  await page.hover('[data-test-name="PointPanel-AddCommentButton"]');
  await page.click('[data-test-name="PointPanel-AddCommentButton"]');
  await page.keyboard.type("Here is my comment");
  await page.keyboard.press("Enter");
  
  // assert comment created
  await assertText(page, "QA Wolf");
  await assertText(page, "Here is my comment");
  
  // delete comment
  await page.click("text=more_vert");
  await page.click("text=Delete comment and replies");
  await page.click('[role="dialog"] button >> text=Delete comment');
  
  // assert comment deleted
  await expect(startConvo).toBeVisible({ timeout: 60 * 1000 });
  
  await logOut(page);
  

  process.exit();
})();