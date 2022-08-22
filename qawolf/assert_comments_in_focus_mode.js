const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
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
  await page.click(':text("Viewer")');
  await expect(page.locator('text="This is a comment"')).toBeVisible();
  await expect(page.locator('text="good evening"')).toBeVisible();
  await expect(page.locator('text="hello"')).toBeVisible();
  
  // assert comment outside of focus zone can be interacted with
  const commentCard = page.locator(".CommentCard_CommentCard__7U_9l"); // selecter needs updating
  await commentCard.first().click();
  expect(await commentCard.first().locator("div >> nth=0").getAttribute("class")).toContain(
    "CommentCard_PausedOverlay__g3ZE1"
  );
  
  // assert that comments inside focus can be interacted with
  await page.click(":text('good evening')");
  const canvasComment = page.locator(".canvas-comment");
  await expect(canvasComment).toBeVisible();
  
  // assert clicking on enabled comment jumps to comment time in video
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition3 = await progressLine.getAttribute("style");
  expect(playheadPosition3.split(" ")[1]).toEqual("82.3617%;");

  process.exit();
})();