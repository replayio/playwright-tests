const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // bug - https://qa-wolf.monday.com/boards/2150171022/pulses/2685472778
  
  // launch page
  const { context, page } = await logIn({ userId: 6, options: { slowMo: 1000 } });
  await page.goto(
    buildUrl(
      "/recording/99215af1-7f6f-4db2-84e4-7a2ea6142240?point=32127336818069823763437554336007621&time=16000&hasFrames=false"
    )
  );
  
  // assert page loaded
  await assertText(page, "Comments");
  
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
  } catch (e) {
    await page.hover(':text("Chris Burton")');
    await page.click(':text("more_vert")');
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button:nth-of-type(2)');
  }
  
  /* 
  Note: the comment flow does't react well to automation. All of the following non-standard
  comment/reply code is put in place to aleviate the undesireable automation reactions. The 
  main things we are testing is that comments and replies show up and are editable/deletable.
  */
  // add comment
  await page.waitForSelector("#video");
  await page.click("#video");
  await page.fill('[contenteditable="true"]', "Test comment @ 15 seconds");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  
  // assert comment created
  const comment = page.locator(".CommentCard_CommentCard__7U_9l >> nth=3");
  await page.waitForSelector(':text("Chris Burton")');
  await expect(comment).toHaveText("Chris BurtonNowmore_vertTest comment @ 15 secondsReply");
  
  // edit comment
  const editCommentButton = page.locator('[role="menuitem"] >> text=Edit comment');
  await page.click('.portal-dropdown-wrapper [type="button"].expand-dropdown');
  await page.waitForTimeout(2000);
  try {
    // make sure that the delete menu didn't close
    await expect(editCommentButton).toBeVisible();
  } catch {
    await page.click('.border-secondaryAccent [type="button"].expand-dropdown');
  }
  await page.click('[role="menuitem"] >> text=Edit comment');
  await page.fill(
    '[contenteditable="true"]',
    "Test comment @ 16 seconds"
  );
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  
  // assert comment changed
  await expect(comment).toHaveText(
    "Chris BurtonNowmore_vertTest comment @ 16 secondsReply",
    { timeout: 60 * 1000 }
  );
  
  // reply to comment
  await page.waitForTimeout(5000);
  try {
    // open reply input with retry as it often auto-closes due to automation issues
    await page.click('div:nth-of-type(4) :text("Reply")');
    await expect(page.locator('[contenteditable="true"]')).toBeVisible();
  } catch {
    await page.click('div:nth-of-type(4) :text("Reply")');
    await expect(page.locator('[contenteditable="true"]')).toBeVisible();
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
  await page.click(':text("more_vert")');
  await page.click(':text("Delete comment")');
  await page.click('[role="dialog"] button:nth-of-type(2)');
  
  // assert comment deleted
  await page.waitForTimeout(2000);
  await expect(page.locator(':text("Chris BurtonNowmore_vertTest comment @ 16 secondsReply")')).not.toBeVisible();
  await expect(reply).not.toBeVisible();

  process.exit();
})();