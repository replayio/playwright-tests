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
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup
} = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn();
  
  // assert viewing library
  await expect(page.locator(`:text('Test Team')`).first()).toBeVisible();
  await expect(page.locator("text=QAWolf :: Facebook")).toBeVisible();
  await expect(page.locator("text=Firebugs >> nth=0")).toBeVisible();
  await page.waitForTimeout(3000);
  
  // search library (one result)
  const replayContainer = page.locator(".text-right");
  await page.fill('[placeholder="Search"]', "Firebugs");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(3000); //time for search to filter
  expect(await replayContainer.count()).toEqual(1);
  
  // search library (multiple results)
  await page.fill('[placeholder="Search"]', "Replay");
  await page.keyboard.press("Enter");
  await page.waitForTimeout(3000); //time for search to filter
  expect(await replayContainer.count()).toEqual(1);
  
  // search library (no results)
  await page.fill('[placeholder="Search"]', "asdfjkl;");
  await page.keyboard.press("Enter");
  
  try {
    await expect(
      page.locator("text=👋 This is where your replays will go!")
    ).toBeVisible({ timeout: 5000 }); // empty placeholder
  } catch {
    await expect(
      page.locator("text=No results found.Show all replays?")
    ).toBeVisible();
  }
  

  process.exit();
})();