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
  // log in
  const { page } = await logIn({ userId: 10, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("Test Permissions")');
  await page.click(':text("React DevTools Recording")');
  
  // assert recording loaded
  await assertText(page, "React DevTools Recording");
  await assertText(page, "Viewer");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  await expect(page.locator(`:text("(index)")`)).not.toBeVisible({
    timeout: 7000,
  });
  
  // expand demo file
  const indexFile = page.locator("text=(index)");
  const scriptFile = page.locator('[role="tree"] :text("demo-script.js")');
  await expect(indexFile).not.toBeVisible();
  await expect(scriptFile).not.toBeVisible();
  await page.click(':text("static.replay.io")');
  await page.click("text=demo");
  await page.click("text=demo-script.js");
  
  // assert demo file expanded
  await expect(indexFile).toBeVisible();
  await expect(scriptFile).toBeVisible();
  
  // open index file
  await expect(
    page.locator(`:text("<title>Your first replay</title>")`)
  ).not.toBeVisible({
    timeout: 7000,
  });
  await indexFile.click();
  
  // assert index file opened
  await assertText(page, "    <title>Your first replay</title>");
  
  // open demo-script.js
  await expect(
    page.locator(`:text("const log = (callback) => setTimeout(callback, 100);")`)
  ).not.toBeVisible({
    timeout: 7000,
  });
  
  await scriptFile.click();
  
  // assert demo-script.js opened
  await assertText(page, "const log = (callback) => setTimeout(callback, 100);");
  
  await logOut(page);
  

  process.exit();
})();