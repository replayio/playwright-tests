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
  // waiting on response - https://qawolfhq.slack.com/archives/C02GEJCC9JP/p1656519350951659
  
  // log in
  const { page } = await logIn({ userId: 6});
  
  // assert page loaded
  await assertText(page, 'Your Library');
  
  // go to settings
  await page.click("text=View settings");
  
  // assert settings loaded
  await page.click(':text("Personal")');
  await assertText(page, "API Keys");
  await assertText(page, "Log Out");
  
  // go to experimental settings
  await page.click("text=Experimental");
  
  // assert settings loaded
  await assertText(page, "Column Breakpoints");
  // await assertText(page, "Global function search");
  
  // ensure current checkbox state is reset
  const devTools = page.locator('#showReact');
  const globalSearch = page.locator('#enableGlobalSearch');
  
  if (await devTools.isChecked() === false) {
    await devTools.click();
    await page.waitForTimeout(1000);
  };
  
  // if (await globalSearch.isChecked() === true) {
  //   await globalSearch.click();
  //   await page.waitForTimeout(1000);
  // };
  
  // disable React DevTools
  await devTools.click();
  await page.waitForTimeout(5000);
  
  // assert React DevTools disabled
  expect(await devTools.isChecked()).toBeFalsy();
  
  // enable Global function search
  // await globalSearch.click();
  // await page.waitForTimeout(1000);
  
  // assert Global function search enabled
  // expect(await globalSearch.isChecked()).toBeTruthy();
  
  // reset checkboxes
  await devTools.click();
  // await globalSearch.click();
  await page.waitForTimeout(5000);
  
  // assert checkboxes reset
  expect(await devTools.isChecked()).toBeTruthy();
  // expect(await globalSearch.isChecked()).toBeFalsy();

  process.exit();
})();