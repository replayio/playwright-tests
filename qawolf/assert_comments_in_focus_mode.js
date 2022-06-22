const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // BUG - https://qa-wolf.monday.com/boards/2150171022/pulses/2803186401
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // navigate to replay
  await page.goto(
    buildUrl(
      "/recording/airtable-playwright-test--6847ab82-8b0a-4dc2-af73-eb6bf14918e7?point=12331705040172899620536796682649667&time=5072.277283660569&hasFrames=true"
    )
  );
  
  // enable focus mode
  await page.waitForSelector(':text("Airtable: Playwright test")');
  await expect(page.locator('[title="Start focus edit mode"]')).toBeVisible();
  await page.click('[title="Start focus edit mode"]');
  
  // drag focus handles
  await setFocus({ handleLocation: "left", moveToX: 500, page });
  await setFocus({ handleLocation: "right", moveToX: 1050, page });
  await page.click(':text("Save")');
  
  // assert all comments are visible
  await expect(page.locator('text="This is a comment"')).toBeVisible();
  await expect(page.locator('text="good evening"')).toBeVisible();
  await expect(page.locator('text="hello"')).toBeVisible();
  
  // assert comment outside of focus zone can't be interacted with
  const commentCard = page.locator(".comment-card");
  await expect(commentCard.first()).toHaveAttribute(
    "title",
    "This comment is currently outside of the focused region"
  );
  await commentCard.first().click();
  expect(await commentCard.first().getAttribute("class")).not.toContain(
    "border-secondaryAccent"
  );
  
  // assert clicking on disabled comment doesn't jump to comment time in video
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition1 = await progressLine.getAttribute("style");
  await page.click(".comment-marker");
  let playheadPosition2 = await progressLine.getAttribute("style");
  expect(playheadPosition1).toEqual(playheadPosition2);
  
  // assert that comments inside focus can be interacted with
  await page.click(":text('good evening')");
  const canvasComment = page.locator(".canvas-comment");
  await expect(canvasComment).toBeVisible();
  
  // assert clicking on enabled comment jumps to comment time in video
  let playheadPosition3 = await progressLine.getAttribute("style");
  expect(playheadPosition3.split(" ")[1]).toEqual("82.3617%;");
  
  // assert clicking on any part of unfocused timeline does nothing
  await page.mouse.click(100, 685.5);
  let playheadPosition4 = await progressLine.getAttribute("style");
  expect(playheadPosition3).toEqual(playheadPosition4);

  process.exit();
})();