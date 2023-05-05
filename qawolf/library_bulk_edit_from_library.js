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
  const assertAllVideosVisible = async (page, not = false) => {
    if (not) {
      // assert all videos are not visible
      await expect(page.locator(':text("Library test 1")')).not.toBeVisible({
        timeout: 10 * 1000,
      });
      await expect(page.locator(':text("Library test 2")')).not.toBeVisible({
        timeout: 10 * 1000,
      });
      await expect(page.locator(':text("Library test 3")')).not.toBeVisible({
        timeout: 10 * 1000,
      });
    } else {
      // assert all videos are visible
      await expect(page.locator(':text("Library test 1")')).toBeVisible({
        timeout: 10 * 1000,
      });
      await expect(page.locator(':text("Library test 2")')).toBeVisible({
        timeout: 10 * 1000,
      });
      await expect(page.locator(':text("Library test 3")')).toBeVisible({
        timeout: 10 * 1000,
      });
    }
  };

  const selectAllVideos = async (page) => {
    // select all videos
    await page.click("button:has-text('Edit')");
    await page.check('[type="checkbox"]:left-of(:text("Library test 1"))');
    await page.check('[type="checkbox"]:left-of(:text("Library test 2"))');
    await page.check('[type="checkbox"]:left-of(:text("Library test 3"))');
    await page.click(':text("expand_more3 items selected")');
  };
  // helpers above

  // log in
  const { page } = await logIn({ userId: 6 });
  await assertText(page, "Library");

  // check if all videos are present
  try {
    // assert all videos are present
    await assertAllVideosVisible(page);
  } catch {
    // go to team
    await page.click(':text("Library: Bulk edit from library1")');

    // assert all videos are present
    await assertAllVideosVisible(page);

    // select all videos
    await selectAllVideos(page);

    // move videos back to your library
    await page.click(`a:has-text("Your library"):below(:text("MOVE TO:"))`);

    // go back to your library
    await page.click(':text("Your Library")');
  }

  // wait for data to load
  await page.waitForTimeout(5000);

  // select all videos
  await selectAllVideos(page);

  // move videos to team
  await page.click(
    `a:has-text("Library: Bulk edit from library1"):below(:text("MOVE TO:"))`
  );

  // assert all videos are not present
  await assertAllVideosVisible(page, true);

  // wait for data to load
  await page.waitForTimeout(5000);

  // go to team with all videos
  await page.click(`:text("Library: Bulk edit from library1")`);

  // assert all videos are present
  await page.waitForTimeout(5000);
  await assertAllVideosVisible(page);

  // select all videos
  await selectAllVideos(page);

  // move videos back Library
  await page.click(`a:has-text("Your library"):below(:text("MOVE TO:"))`);

  // assert all videos are not present
  await assertAllVideosVisible(page, true);

  // go back to your Library
  await page.click(`:text("Your Library")`);

  // assert all videos are present
  await page.waitForTimeout(5000);
  await assertAllVideosVisible(page);

  process.exit();
})();
