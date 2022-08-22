const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // helper
  const deleteCommentsAndReplies = async (page) => {
    await page.click("text=Delete comment and replies");
    await page.click("button >> text=Delete comment");
    await page.click("text=Start");
  };
  
  // log in and go to replay
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await page.click(':text("Test Commenters")');
  await page.click("text=User role commenter test");
  
  // assert replay and comments loaded
  await expect(page.locator('text="User role commenter test"')).toBeVisible({
    timeout: 30 * 1000,
  });
  await expect(page.locator('text="DevTools"')).toBeVisible();
  
  // confirm starter comments exists and no others
  try {
    await expect(page.locator('text="Start"')).toBeVisible();
    await expect(page.locator('text="Click on courthouse"')).toBeVisible();
  } catch {
    await page.click(".commands button");
    await page.waitForTimeout(1200);
    await page.click(".commands button");
    await page.click("#video");
    await page.fill(".ProseMirror", "Start");
    await page.keyboard.press("Enter");
  
    await page.click(".commands button");
    await page.waitForTimeout(1000);
    await page.click(".commands button");
    await page.click("#video");
    await page.fill(".ProseMirror >> nth=1", "Click on courthouse");
    await page.keyboard.press("Enter");
    await expect(page.locator('text="Start"')).toBeVisible();
    await expect(page.locator('text="Click on courthouse"')).toBeVisible();
  }
  
  // this next section is deleting one of the starting comments instead of cleaning up leftovers from prev runs
  
  // delete leftover comments
  const thirdCommentBlock = page.locator(`:text("more_vert") >> nth=2`);
  while (await thirdCommentBlock.count()) {
    await page.click(':text("more_vert") >> nth=2');
    await deleteCommentsAndReplies(page);
  }
  
  // assert initial player time
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("24.155%;");
  
  // jump to next event marker
  await page.click("text=Click on courthouse");
  
  // assert new player time
  let playheadPosition = await progressLine.getAttribute("style");
  expect(playheadPosition.split(" ")[1]).toEqual("38.2653%;");
  
  // add comment
  await page.mouse.click(500, 500); // click elsewhere on the video
  await page.waitForTimeout(2000); // The input seems to double up so seeing if a timeout will help
  await page.fill(".ProseMirror-focused", "Here is my mispelling");
  await page.waitForTimeout(2000); // The input seems to double up so seeing if a timeout will help
  
  await page.keyboard.press("Enter");
  
  // assert new comment added
  await page.waitForTimeout(5000);
  await expect(page.locator('text="Here is my mispelling"')).toBeVisible();
  
  // edit comment
  await page.waitForTimeout(5000);
  await page
    .locator(':text("more_vert"):above(:text("Here is my mispelling"))')
    .first()
    .click();
  await page.click("text=Edit comment");
  await page.click('div[contenteditable="true"]', "Here is my mispelling");
  await page.waitForSelector('div[contenteditable="true"]');
  // input re-enable due to random input blur during automation that isn't reproducible in browser
  await page.click('div[contenteditable="true"]', "Here is my mispelling");
  await page.fill(".ProseMirror-focused", "Here is my updated comment!");
  await page.waitForTimeout(1000);
  await page.keyboard.press("Enter");
  
  // assert updated comment
  await expect(page.locator('text="Here is my updated comment!"')).toBeVisible();
  
  // reply to own comment
  await page.waitForTimeout(3000);
  await page.click('button:below(:text("Here is my updated comment!"))');
  await page.waitForSelector('[contenteditable="true"]');
  await page.fill(".ProseMirror-focused", "Here is my reply");
  await page.keyboard.press("Enter");
  
  // assert reply added
  await page.waitForTimeout(6000);
  await expect(page.locator('text="Here is my reply"')).toBeVisible();
  
  // reply doesn't always delete properly with automation but deletes without issue in a browser
  // added while loop to give three times to try to delete replies
  await page.waitForTimeout(7000);
  
  // delete reply
  const reply = page.locator(
    ':text("QA WolfNowmore_vertHere is my reply") button'
  );
  if (await reply.count()) {
    let count = 1;
    while (count < 4 && (await reply.count())) {
      await page.waitForTimeout(3000);
      await reply.click();
      await page.waitForTimeout(2000); // have to slow down delete
      await page.click("text=Delete comment");
      await page.waitForTimeout(2000); // have to slow down delete
      await page.click("button >> text=Delete comment");
      count += 1;
    }
  }
  
  // assert reply deleted
  await expect(page.locator('text="Here is my reply"')).not.toBeVisible({
    timeout: 10 * 1000,
  });
  
  // add reply to delete both at same time
  await page.click('button:below(:text("Here is my updated comment!"))');
  await page.fill(".ProseMirror-focused", "Here is my delete reply");
  await page.keyboard.press("Enter");
  
  // delete comment and reply\
  await page.waitForTimeout(3000);
  await page
    .locator(':text("more_vert"):above(:text("Here is my updated comment!"))')
    .first()
    .click();
  await deleteCommentsAndReplies(page);
  
  // assert comment and reply deleted
  await expect(
    page.locator('text="Here is my updated comment!"')
  ).not.toBeVisible({ timeout: 10 * 1000 });
  await expect(page.locator('text="Here is my delete reply!"')).not.toBeVisible();
  

  process.exit();
})();