const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.locator(`:text-is("React DevTools Recording")`).click();
  await page.click("text=ViewerDevTools");
  
  // filter console by mouse click
  // check if console-filter-toggle is already open
  await page.waitForTimeout(5000);
  try {
    const consoleLocator = page.locator('text="Hide Node Modules"');
    await expect(consoleLocator).toBeVisible({timeout: 5000});
  } catch {
    await page.click("#toolbox-content-console button");
  }
  
  await page.click("text=Mouse");
  const mouseClickCheckbox = page.locator(
    '[data-test-id="EventTypes-event.mouse.click"] [type="checkbox"]'
  );
  expect(await mouseClickCheckbox.isChecked()).not.toBeTruthy();
  await expect(page.locator(`:text("MouseEvent")`)).not.toBeVisible();
  await mouseClickCheckbox.check();
  await page.waitForTimeout(2000); //give filter time to apply
  
  // assert filter
  expect(await mouseClickCheckbox.isChecked()).toBeTruthy();
  await expect(page.locator('[data-test-message-type="event"]')).toHaveCount(9);
  
  // remove filter
  await mouseClickCheckbox.uncheck();
  
  // assert filter removed
  expect(await mouseClickCheckbox.isChecked()).not.toBeTruthy();
  await expect(page.locator('[data-test-name="Message"] :text("target")')).toHaveCount(0);
  
  await logOut(page);
  

  process.exit();
})();