const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await expect(page.locator("text=Test Permissions")).toBeVisible();
  
  // go to replay
  await page.click(
    '[href="/recording/time-travel-qa8--a7576f44-e4d3-46f3-a349-058b65a17046"]'
  );
  
  // confirm first comment exists
  try {
    await expect(page.locator('text="First comment"')).toBeVisible({
      timeout: 5000,
    });
  } catch {
    await page.click("#video");
    await page.fill(".ProseMirror", "First comment");
    await page.keyboard.press("Enter");
    await expect(page.locator('text="First comment"')).toBeVisible();
  }
  
  // delete leftover comments
  await page.click("text=First comment");
  const secondCommentBlock = page.locator('.border-transparent [type="button"]');
  while (await secondCommentBlock.count()) {
    await page.click('.border-transparent [type="button"]');
    await page.click("text=Delete comment and replies");
    await page.click("button >> text=Delete comment");
    await page.waitForTimeout(1000);
  }
  
  // start and stop video
  await page.click(".commands button");
  await page.waitForTimeout(1200);
  await page.click(".commands button");
  await page.waitForTimeout(3000);
  
  // add comment
  await page.click("#video");
  await page.waitForTimeout(1000);
  await page.fill(".ProseMirror-focused", "Here is my comment");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
  
  // assert comment loaded
  await expect(page.locator('text="Here is my comment"')).toBeVisible();
  
  // delete comment
  await page.waitForTimeout(3000);
  const moreMenu = page.locator('.portal-dropdown-wrapper [type="button"]');
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