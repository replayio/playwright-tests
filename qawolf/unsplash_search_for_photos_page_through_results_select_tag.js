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
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://unsplash.com/');
  
  // assert page is loaded
  await assertText(page, "Log in");
  
  // search for trees
  await page.fill('[data-test="homepage-header-search-form-input"]', "trees");
  await page.press('[data-test="homepage-header-search-form-input"]', "Enter");
  
  // assert search results
  await assertText(page, "Trees", { selector: '[data-test="page-header-title"]' });
  
  // click image
  await page.click("figure img");
  
  // assert clicked image
  // await assertText(page, "Views");
  
  // navigate through results
  await page.click('[title="Next"]');
  await page.click('[title="Next"]');
  await page.click('[title="Next"]');
  
  // select tags
  await page.click('.ReactModalPortal a[href^="/s"]');
  
  // assert results are different after selecing tag
  // await assertNotText(page, "Trees", { selector: '[data-test="page-header-title"]' });
  await expect(page.locator('[data-test="page-header-title"]')).not.toHaveText("Trees")
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();