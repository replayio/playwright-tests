const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, 'Library');
  
  // go to recording
  // await page.click('[title="Test Permissions"]');
  await page.click(':text("Test Permissions")');
  await page.click('text=Time Travel');
  
  // assert recording loaded
  await assertText(page, 'Time Travel');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  await assertNotText(page, '(index)');
  
  // enable timestamps
  const showTimestampsCheckbox = page.locator('text=Show Timestamps');
  const timestamp = page.locator('[role="main"] .timestamp');
  if (await timestamp.count()) showTimestampsCheckbox.uncheck();
  await page.waitForTimeout(2000);
  expect(await timestamp.count()).toEqual(0);
  expect(await showTimestampsCheckbox.isChecked()).toBeFalsy();
  await showTimestampsCheckbox.check();
  
  // assert timestamps appeared
  expect(await showTimestampsCheckbox.isChecked()).toBeTruthy();
  await page.waitForTimeout(5000);
  expect(await timestamp.count()).toEqual(6);
  
  // hide timestamps
  await showTimestampsCheckbox.uncheck();
  expect(await showTimestampsCheckbox.isChecked()).not.toBeTruthy();
  expect(await timestamp.count()).toEqual(0);

  process.exit();
})();