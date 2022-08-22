const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(`:text("Test Permissions")`)
  
  // open replay
  await page.click('text=Permissions: Great Scott');
  await page.click("text=ViewerDevTools");
  
  // filter console by mouse click
  // check if console-filter-toggle is already open
  await page.waitForTimeout(5000);
  const isConsoleVisible = await page.$('text="Hide Node Modules"');
  if (isConsoleVisible) {
  } else {
    await page.click("#toolbox-content-console button");
  }
  // await page.click("#show-errors");
  // await page.click("#show-logs");
  await page.click('text=Mouse');
  const mouseClickCheckbox = page.locator('[title="View click events"] [type="checkbox"]');
  expect(await mouseClickCheckbox.isChecked()).not.toBeTruthy();
  await assertNotText(page, 'clientX');
  await mouseClickCheckbox.check();
  await page.waitForTimeout(2000); //give filter time to apply
  
  // assert filter
  expect(await mouseClickCheckbox.isChecked()).toBeTruthy();
  await assertText(page, 'clientX');
  
  // remove filter
  await mouseClickCheckbox.uncheck();
  
  // assert filter removed
  expect(await mouseClickCheckbox.isChecked()).not.toBeTruthy();
  await assertNotText(page, 'clientX');

  process.exit();
})();