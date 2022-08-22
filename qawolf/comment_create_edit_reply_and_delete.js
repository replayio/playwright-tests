const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  //Context: https://qawolfhq.slack.com/archives/C02K01LSEAE/p1660862225915889
  
  // launch page
  const { context, page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  // const { context, page } = await logIn({ userId: 1, options: { slowMo: 1000 } });
  // await page.goto(buildUrl("/recording/99215af1-7f6f-4db2-84e4-7a2ea6142240"));
  await page.goto(
    buildUrl("/recording/qa-wolf--f4bdbfba-6072-48ec-8978-f06e94551d4d")
  );
  
  // assert page loaded
  try {
    await assertText(page, "Comments");
  } catch {
    await page.click(':text("forum")');
    await assertText(page, "Comments");
  }
  
  // reload the page if no share button (not signed in)
  try {
    await expect(page.locator(':text("ios_shareShare")')).toBeVisible();
  } catch {
    await page.reload();
    await page.waitForSelector(':text("ios_shareShare")');
  }
  
  await page.waitForTimeout(10 * 1000); // give video time to load
  
  // ensure comment deleted
  try {
    await expect(
      page.locator("text=Test comment @ 15 seconds")
    ).not.toBeVisible();
    await expect(
      page.locator("text=Test comment @ 16 seconds")
    ).not.toBeVisible();
  } catch {
    await page.hover(':text("Chris Burton")');
    await page.click(':text("more_vert")');
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button:nth-of-type(2)');
  }
  
  // advance video to uncommented area
  await page.waitForSelector("#video");
  try {
    await page.click('[src="/images/playback-play.svg"]', { timeout: 5000 });
  } catch {
    await page.click('[src="/images/playback-refresh.svg"]');
    await page.click('[src="/images/playback-play.svg"]');
  }
  await page.waitForTimeout(8000);
  await page.click('[src="/images/playback-pause.svg"]');
  
  /* 
  Note: the comment flow doesn't react well to automation. All of the following non-standard
  comment/reply code is put in place to aleviate the undesireable automation reactions. The 
  main things we are testing is that comments and replies show up and are editable/deletable.
  */
  // add comment
  await page.click("#video");
  await page.waitForTimeout(1000);
  await page.keyboard.type("Test comment @ 15 seconds");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  
  // assert comment created
  await page.waitForSelector(':text("Test comment @ 15 seconds")');
  let comment = page.locator(
    "[class*='CommentCard_CommentCard']:has-text('Test comment @ 15 seconds')"
  );
  await expect(comment).toHaveText(
    "Chris BurtonNowmore_vertTest comment @ 15 secondsReply"
  );
  
  // edit comment
  const editCommentButton = page.locator(
    '[role="menuitem"] >> text=Edit comment'
  );
  let vertMenu = comment.locator(':text("more_vert")');
  await vertMenu.click();
  await page.waitForTimeout(2000);
  try {
    // make sure that the delete menu didn't close
    await expect(editCommentButton).toBeVisible();
  } catch {
    await vertMenu.click();
  }
  await page.click('[role="menuitem"] >> text=Edit comment');
  await page.keyboard.press("Control+a");
  await page.keyboard.type("Test comment @ 16 seconds");
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  
  // assert comment changed
  await expect(page.locator('p:text("Test comment @ 16 seconds")')).toBeVisible();
  
  // reply to comment
  let comment = page.locator(
    "[class*='CommentCard_CommentCard']:has-text('Test comment @ 16 seconds')"
  );
  const replyButton = comment.locator(':text("Reply")');
  await page.waitForTimeout(5000);
  try {
    // open reply input with retry as it often auto-closes due to automation issues
    await replyButton.click();
    await expect(
      page.locator('[contenteditable="true"].ProseMirror-focused')
    ).toBeVisible();
  } catch {
    await replyButton.click();
    await expect(
      page.locator('[contenteditable="true"].ProseMirror-focused')
    ).toBeVisible();
  }
  await page.waitForTimeout(1000);
  await page.keyboard.press("Backspace");
  await page.keyboard.type("Here is a reply");
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  await page.waitForTimeout(5000);
  
  // assert reply
  const reply = page.locator("text=Here is a reply");
  await expect(reply).toBeVisible();
  
  // delete comment
  let vertMenu = comment.locator(':text("more_vert")');
  await vertMenu.first().click();
  await page.click(':text("Delete comment and replies")');
  await page.click('[role="dialog"] button:nth-of-type(2)');
  
  // assert comment deleted
  await page.waitForTimeout(2000);
  await expect(comment).not.toBeVisible();
  await expect(reply).not.toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();