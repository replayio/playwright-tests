const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 500 } });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Commenters")');
  await page.click('text=Test commenter 2');
  
  // assert replay loaded
  await assertText(page, 'Test commenter 2', {timeout: 120 * 1000});
  await assertText(page, 'DevTools');
  
  // ensure comments deleted
  const comments = page.locator('text=comments');
  if (await comments.count() < 1) {
    await page.click("text=forum");
  };
  
  const copyWhenThereAreNoComments = page.locator('text=Add a comment');
  while (await copyWhenThereAreNoComments.count() < 1) {
    await page.click("text=more_vert");
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button:nth-of-type(2)');
    await page.waitForTimeout(2000);
  };
  await expect(copyWhenThereAreNoComments).toBeVisible();
  
  // add comment by clicking on video
  await page.mouse.click(800, 400);
  await page.waitForTimeout(5000);
  await page.keyboard.type('Here is my comment');
  await page.keyboard.press('Enter');
  
  // assert comment
  await assertText(page, 'Here is my comment');
  const userQaWolf = page.locator('text=QA Wolf');
  await expect(userQaWolf).toHaveCount(1);
  
  // edit comment
  await page.waitForTimeout(5000);
  await page.click("text=more_vert");
  await page.click("text=Edit comment");
  await page.fill(".ProseMirror", "Here is my updated comment");
  await page.keyboard.press('Enter');
  
  // assert edited comment
  await assertText(page, 'Here is my updated comment');
  
  // enter reply
  await page.waitForTimeout(5000);
  try { // flakes a lot so added a retry
    await page.click("text=Reply");
    await page.fill(".ProseMirror-focused", "Here is my reply");
    await page.keyboard.press('Enter');
  } catch {
    await page.click("text=Reply");
    await page.fill(".ProseMirror-focused", "Here is my reply");
    await page.keyboard.press('Enter');
  }
  
  // assert reply
  await assertText(page, 'Here is my reply');
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