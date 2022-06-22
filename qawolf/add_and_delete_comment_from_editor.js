const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Commenters"]');
  await page.click('text=Test commenter 3');
  
  // assert replay loaded
  await assertText(page, 'Test commenter 3');
  await assertText(page, 'DevTools');
  
  // ensure comments deleted
  const comments = page.locator('text=comments');
  if (await comments.count() < 1) {
    await page.click("text=forum");
  };
  
  const startConvo = page.locator('text=Start a conversation');
  while (await startConvo.count() < 1) {
    await page.click("text=more_vert");
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button >> text=Delete comment');
    await page.waitForTimeout(2000);
  };
  await expect(startConvo).toBeVisible();
  
  // open DevTools and demo-script.js
  await page.click("text=ViewerDevTools");
  await page.click("text=demo");
  await page.click("text=demo-script.js");
  
  // add comment to file
  await page.hover('text=const buttons', { force: true });
  await page.waitForTimeout(1000);
  const addCommentButton = page.locator('button.toggle-widget');
  await addCommentButton.click();
  await page.click('[aria-label="Add comment"]');
  await page.keyboard.type('Here is my comment');
  await page.keyboard.press('Enter');
  
  // assert comment entered
  await assertText(page, 'const buttons = document.querySelectorAll("button");\nkeyboard_arrow_right');
  await assertText(page, 'QA Wolf');
  await assertText(page, 'Here is my comment');
  
  // delete comment
  await page.click("text=more_vert");
  await page.click("text=Delete comment and replies");
  await page.click('[role="dialog"] button >> text=Delete comment');
  await page.click('[title="Close tab"]');
  
  // assert comment deleted
  await page.waitForTimeout(2000);
  await expect(startConvo).toBeVisible();

  process.exit();
})();