const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
} = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");

  // navigate to replay
  await page.goto(
    buildUrl(
      "/recording/playwright-test-teams-airtable--69bdd408-b9bf-49a4-b914-608e92c026ce"
    )
  );

  // enable focus mode
  await page.waitForSelector(':text("Playwright Test: Teams - Airtable")');
  await expect(page.locator('[title="Start focus edit mode"]')).toBeVisible();
  await page.click('[title="Start focus edit mode"]');
  await page.waitForTimeout(5000);

  // drag focus handles
  await setFocus({ handleLocation: "right", moveToX: 1050, page });
  await setFocus({ handleLocation: "left", moveToX: 200, page });
  try {
    await page.click(':text("Save")');
  } catch {
    await page.reload();
    await page.click(':text("Save")');
  }

  // assert all comments are visible
  await page.click(':text("Viewer")');
  await expect(page.locator('text="First comment"')).toBeVisible();
  await expect(page.locator('text="This is a comment"')).toBeVisible();
  await expect(page.locator('text="good evening"')).toBeVisible();
  await expect(page.locator('text="hello"')).toBeVisible();
  await expect(page.locator('text="Last comment"')).toBeVisible();

  // assert comment outside of focus zone can be interacted with
  await page.click(':text("Viewer")');
  const commentMarker = page.locator(".comment-marker");
  const commentCard = page.locator('[class*="CommentCard_CommentCard"]');
  await page.waitForTimeout(2000);
  await commentCard.nth(1).click(); // clicking second comment moves to DevTools bug - couldn't replicate it on Replay though
  await page.waitForTimeout(2000);
  await page.click(':text("Viewer")');
  await commentCard.first().click();
  await page.waitForTimeout(5000);
  expect(
    await commentCard.first().locator("div >> nth=0").getAttribute("class")
  ).not.toContain(
    "CommentCard_PausedOverlay__g3ZE1"
    // "EditableRemark_HeaderRow___vN8T"
  );
  const firstCommentClasses = await page.getAttribute(
    ".comment-marker >> nth=0",
    "class"
  );
  expect(firstCommentClasses).toContain("paused");

  // assert that comments inside focus can be interacted with
  await page.waitForTimeout(2000);
  await page.click(":text('good evening')", { delay: 500 });
  await expect(commentCard.nth(2).locator("div >> nth=0")).toHaveClass(
    /CommentCard_PausedOverlay/
  );
  const thirdCommentClasses = await page.getAttribute(
    ".comment-marker >> nth=2",
    "class"
  );
  expect(thirdCommentClasses).toContain("paused");

  // assert clicking on enabled comment jumps to comment time in video
  await commentMarker.nth(3).click();
  const progressLine = page.locator(".progress-line").last();
  let playheadPosition3 = await progressLine.getAttribute("style");
  expect(playheadPosition3.split(" ")[1]).toEqual("92.0574%;");

  process.exit();
})();
