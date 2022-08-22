const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in and go to replay
  // const { page } = await logIn({ userId: 6, options: { slowMo: 1000 } }); // Chris Burton account 
  const { page } = await logIn({ userId: 10, options: { slowMo: 1000 } });
  await expect(page.locator("text=View settings")).toBeVisible({
    timeout: 10 * 1000,
  });
  
  await page.click(':text("Test Permissions")');
  await page.click(':text("React DevTools Recording")');
  
  // assert replay and comments loaded
  await expect(page.locator('text="Viewer"')).toBeVisible({
    timeout: 60 * 1000,
  });
  
  try {
    await expect(page.locator('text="Comments"')).toBeVisible();
  } catch {
    await page.click(':text("forum")');
  }
  
  // delete leftover comments
  const leftover = page.locator('text="QA Wolf"');
  while (await leftover.count()) {
    await leftover.first().hover();
    await page.click(".portal-dropdown-wrapper button");
    await page.click("text=Delete comment and replies");
    await page.click("button >> text=Delete comment");
  }
  
  // add comment
  try {
    await page.click('button img[src="/images/playback-play.svg"]', {
      timeout: 5000,
    });
  } catch {
    await page.click('[src="/images/playback-refresh.svg"]');
    await page.click('button img[src="/images/playback-play.svg"]');
  }
  
  await page.waitForTimeout(2000);
  await page.click('[src="/images/playback-pause.svg"]');
  
  try {
    await page.click("#video");
    await expect(page.locator("text=QA Wolf")).toBeVisible();
  } catch {
    await page.click("#video");
    await expect(page.locator("text=QA Wolf")).toBeVisible();
  }
  await page.waitForTimeout(2000);
  await page.fill('.ProseMirror', "Here is my mispelling");
  await page.waitForTimeout(2000);
  await page.keyboard.press("Enter");
  
  // assert new comment added
  await expect(page.locator('text="Here is my mispelling"')).toBeVisible();
  
  // edit comment
  await page.hover(':text("more_vert")');
  await page.click(".portal-dropdown-wrapper button");
  await page.click("text=Edit comment");
  await page.fill(".ProseMirror-focused", "Here is my updated comment!");
  await page.keyboard.press("Enter");
  
  // assert updated comment
  await expect(page.locator('text="Here is my updated comment!"')).toBeVisible();
  
  // reply to own comment
  await page.click('button:below(:text("Here is my updated comment!"))');
  await page.waitForSelector('.ProseMirror-focused');
  await page.fill(".ProseMirror-focused", "Here is my reply");
  await page.keyboard.press("Enter");
  
  // assert reply added
  await page.waitForTimeout(2000);
  await expect(page.locator('text="Here is my reply"')).toBeVisible();
  await page.waitForTimeout(2000);
  
  // delete reply
  const reply = page.locator('text="Here is my reply"');
  await reply.hover();
  await page.click(
    ".portal-dropdown-wrapper button:near(:text('Here is my reply'))"
  );
  await page.click("text=Delete comment");
  await page.click("button >> text=Delete comment");
  await page.waitForTimeout(2000);
  
  // assert reply deleted
  await expect(page.locator('text="Here is my reply"')).not.toBeVisible();
  
  // add reply to delete both at same time
  await page.click('button:below(:text("Here is my updated comment!"))');
  await page.fill(".ProseMirror-focused", "Here is my delete reply");
  await page.keyboard.press("Enter");
  
  // delete comment and reply
  await page.waitForTimeout(2000);
  await page.hover('text="QA Wolf"');
  await page.click(".portal-dropdown-wrapper button");
  await page.click("text=Delete comment and replies");
  await page.click("button >> text=Delete comment");
  
  // assert comment and reply deleted
  await expect(
    page.locator('text="Here is my updated comment!"')
  ).not.toBeVisible({ timeout: 10 * 1000 });
  await expect(page.locator('text="Here is my delete reply!"')).not.toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();