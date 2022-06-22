const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in and go to replay
  const { page } = await logIn({ userId: 10 });
  await expect(
    page.locator("#app-container span >> text=Your Library")
  ).toBeVisible();
  await page.goto(
    buildUrl(
      "/recording/framer-replay-example--0ff790cd-81fc-441d-8a33-b570fc7850c4"
    )
  );
  
  // assert replay and comments loaded
  await expect(page.locator('text="DevTools"')).toBeVisible({ timeout: 60000 });
  await expect(page.locator('text="Comments"')).toBeVisible();
  await page.waitForTimeout(5000);
  
  // delete leftover comments
  const leftover = page.locator('text="QA Wolf"');
  while ((await leftover.count()) >= 1) {
    await leftover.first().hover();
    await page.click(".portal-dropdown-wrapper button");
    await page.click("text=Delete comment and replies");
    await page.click("button >> text=Delete comment");
  }
  
  // add comment
  await page.click('button img[src="/images/playback-play.svg"]');
  await page.waitForTimeout(3000);
  await page.click('[src="/images/playback-pause.svg"]');
  await page.click("#video");
  await page.waitForTimeout(3000);
  await page.click("#video");
  await page.waitForTimeout(3000);
  await page.fill('[contenteditable="true"]', "Here is my mispelling");
  await page.waitForTimeout(3000);
  await page.keyboard.press("Enter");
  
  // assert new comment added
  await page.waitForTimeout(2000);
  await expect(page.locator('text="Here is my mispelling"')).toBeVisible();
  
  // edit comment
  await page.waitForTimeout(2000);
  await page.hover('div:nth-of-type(4) [type="button"]');
  await page.click(".portal-dropdown-wrapper button");
  await page.click("text=Edit comment");
  await page.click('div[contenteditable="true"]', "Here is my mispelling");
  await page.waitForSelector('div[contenteditable="true"]');
  await page.click('div[contenteditable="true"]', "Here is my mispelling");
  await page.fill(".ProseMirror-focused", "Here is my updated comment!");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
  
  // assert updated comment
  await expect(page.locator('text="Here is my updated comment!"')).toBeVisible();
  
  // reply to own comment
  await page.click('button:below(:text("Here is my updated comment!"))');
  await page.waitForSelector('[contenteditable="true"]');
  await page.fill(".ProseMirror-focused", "Here is my reply");
  await page.keyboard.press("Enter");
  
  // assert reply added
  await page.waitForTimeout(3000);
  await expect(page.locator('text="Here is my reply"')).toBeVisible();
  await page.waitForTimeout(3000);
  
  // delete reply
  const reply = page.locator('text="Here is my reply"');
  await reply.hover();
  await page.click(
    ".portal-dropdown-wrapper button:near(:text('Here is my reply'))"
  );
  await page.click("text=Delete comment");
  await page.click("button >> text=Delete comment");
  await page.waitForTimeout(3000);
  // assert reply deleted
  await expect(page.locator('text="Here is my reply"')).not.toBeVisible();
  
  // add reply to delete both at same time
  await page.click('button:below(:text("Here is my updated comment!"))');
  await page.fill(".ProseMirror-focused", "Here is my delete reply");
  await page.keyboard.press("Enter");
  
  // delete comment and reply
  await page.waitForTimeout(3000);
  await page.hover('text="QA Wolf"');
  await page.click(".portal-dropdown-wrapper button");
  await page.click("text=Delete comment and replies");
  await page.click("button >> text=Delete comment");
  
  // assert comment and reply deleted
  await page.waitForTimeout(3000);
  await expect(
    page.locator('text="Here is my updated comment!"')
  ).not.toBeVisible();
  await expect(page.locator('text="Here is my delete reply!"')).not.toBeVisible();
  

  process.exit();
})();