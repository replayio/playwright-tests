const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await expect(page.locator('text=Test Permissions')).toBeVisible();
  
  // go to replay
  await page.click('[href="/recording/time-travel-qa8--a7576f44-e4d3-46f3-a349-058b65a17046"]');
  
  // assert replay loaded
  await expect(page.locator('text="Comments"')).toBeVisible({ timeout: 60000 });
  
  // nav to settings
  await page.click(':text("more_horiz")');
  await page.click(':text("Settings")');
  await expect(page.locator('text="Theme"')).toBeVisible();
  
  // dark mode
  await page.click('[aria-haspopup="true"]');
  await page.click(':text("Dark")');
  await expect(page.locator('.modal-content')).toHaveCSS('color', 'rgb(237, 237, 240)');
  
  // light mode
  await page.click('[aria-haspopup="true"]');
  await page.click(':text("Light")');
  await expect(page.locator('.modal-content')).toHaveCSS('color', "rgb(56, 56, 61)");
  
  // reset to system (default)
  await page.click('[aria-haspopup="true"]');
  await page.click(':text("System")');

  process.exit();
})();