const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Comment: create, edit, reply and delete";

  //make new replay for this test to use that's longer than 15 seconds
  
  // launch page
  const { context, page } = await logIn({
    userId: 6,
    options: {
      slowMo: 1000,
    },
  });
  // const { context, page } = await logIn({ userId: 1, options: { slowMo: 1000 } });
  await page.click(':text("Test Team")');
  await page.click(
    '[href="/recording/longer-replay-for-testing--7e7af868-3651-49ed-b02c-4216df943fec"]'
  );
  
  // assert page loaded
  await expect(page.locator('button :text("forum")')).toBeVisible();
  await assertText(page, "Comments");
  
  // reload the page if no share button (not signed in)
  try {
    await expect(page.locator(':text("ios_shareShare")')).toBeVisible();
  } catch {
    await page.reload();
    await page.waitForSelector(':text("ios_shareShare")');
  }
  await page.waitForTimeout(3000); // give video time to load
  
  // ensure comments deleted
  const testComment = page.locator(':text("seconds")');
  while (await testComment.count()) {
    await page.click(`:text("more_vert"):right-of(:text("seconds")) >> nth=0`);
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button:nth-of-type(2)');
    await page.waitForTimeout(3000);
  }
  
  // advance video to uncommented area
  await page.waitForSelector("#video");
  try {
    await page.click('[src="/images/playback-play.svg"]', { timeout: 5000 });
  } catch {
    await page.click('[src="/images/playback-refresh.svg"]');
    await page.click('[src="/images/playback-play.svg"]');
  }
  await page.waitForTimeout(5000);
  await page.click('[src="/images/playback-pause.svg"]');
  await page.waitForTimeout(1000);
  
  /* 
  Note: the comment flow doesn't react well to automation. All of the following non-standard
  comment/reply code is put in place to aleviate the undesireable automation reactions. The 
  main things we are testing is that comments and replies show up and are editable/deletable.
  */
  // add comment
  await page.click("#video", { force: true, delay: 400 });
  await page.waitForTimeout(3000);
  // await page.click('[data-test-name="ToolbarButton-Comments"]');
  await page.keyboard.type("Test comment @ 6 seconds");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(2000);
  
  // assert comment created
  await page.waitForSelector(':text("Test comment @ 6 seconds")');
  let comment = page.locator(
    "[class*='CommentCard_CommentCard']:has-text('Test comment @ 6 seconds')"
  );
  // await expect(comment).toHaveText(
  //   "Chris BurtonNowmore_vertTest comment @ 6 secondsReply"
  // );
  await expect(comment).toBeVisible();
  
  // edit comment
  const editCommentButton = page.locator(
    '[data-test-name="ContextMenuItem"]:has-text("Edit comment")'
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
  await editCommentButton.click();
  await page.keyboard.press("Control+a");
  await page.keyboard.type("Test comment @ 7 seconds");
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  
  // assert comment changed
  await expect(page.locator(':text("Test comment @ 7 seconds")')).toBeVisible();
  
  // reply to comment
  let comment = page.locator(
    "[class*='CommentCard_CommentCard']:has-text('Test comment @ 7 seconds') >> nth=0"
  );
  const replyButton = comment.locator(':text("Reply")');
  await page.waitForTimeout(5000);
  try {
    // open reply input with retry as it often auto-closes due to automation issues
    await replyButton.click();
    await expect(
      page.locator('[data-test-id="leftSidebar"] [class^="EditableRemark_Content"] [contenteditable="true"]')
    ).toBeVisible();
  } catch {
    await replyButton.click();
    await expect(
      page.locator('[data-test-id="leftSidebar"] [class^="EditableRemark_Content"] [contenteditable="true"]')
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
  await page.locator("text=Delete comment").click();
  // await page.click(':text("Delete comment and replies")');
  await page.click('[role="dialog"] button:nth-of-type(2)');
  
  // assert comment deleted
  await page.waitForTimeout(2000);
  await expect(comment).not.toBeVisible();
  await expect(reply).not.toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();