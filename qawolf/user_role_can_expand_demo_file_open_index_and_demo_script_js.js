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
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(`:text("Test Permissions")`);
  await page.click("text=Permissions: Great Scott");
  
  // assert recording loaded
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  await expect(page.locator(`:text("(index)")`)).not.toBeVisible();
  
  // expand demo file
  const indexFile = page.locator("text=(index)");
  const scriptFile = page.locator(
    "div:nth-of-type(1) .node >> text=demo-script.js"
  );
  await expect(indexFile).not.toBeVisible();
  await expect(scriptFile).not.toBeVisible();
  await page.click(':text("static.replay.io")');
  await page.click("text=demo");
  await page.click("text=demo-script.js");
  
  // assert demo file expanded
  await expect(indexFile).toBeVisible();
  await expect(scriptFile).toBeVisible();
  
  // assert demo-script.js opened
  await expect(
    page.locator(':text("const log = (callback) => setTimeout(callback, 100);")')
  ).toBeVisible();
  
  // open index file
  await expect(
    page.locator(`:text("<title>Your first replay</title>")`)
  ).not.toBeVisible();
  await indexFile.click();
  
  // assert index file opened
  await expect(
    page.locator(':text("<title>Your first replay</title>")')
  ).toBeVisible();
  

  process.exit();
})();