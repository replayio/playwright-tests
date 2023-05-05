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
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // https://app.replay.io/recording/great-scott--191600fa-f665-4369-abee-8735eef30832 (from userId 6)
  // https://app.replay.io/recording/private-recording-test--149e2344-f94b-4095-a760-d9c67d5b4277 (from userId 6)
  
  // helper
  const url = buildUrl("/recording/149e2344-f94b-4095-a760-d9c67d5b4277");
  
  // go to the replay without being logged in
  let { browser, context } = await launch();
  await context.setExtraHTTPHeaders({
    "Authorization": ""
  }); // make sure log in is cleared
  let page = await context.newPage();
  await page.goto('https://replay.io');
  await page.evaluate(() => {
    localStorage.clear();
  });
  await page.goto(url);
  
  // check the public cannot access it
  try{ // the language here changes occasionally
    await expect(page.locator(`text=Sorry, you don't have permission!`)).toBeVisible();
    await expect(page.locator("button")).toHaveText("Request access");
  } catch{
    await expect(page.locator(`text=Almost there!`)).toBeVisible();
    await expect(page.locator("button")).toHaveText("Sign in to Replay");
  }

  process.exit();
})();