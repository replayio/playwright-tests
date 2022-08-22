const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await expect(page.locator('text="Your Library"')).toHaveCount(2);
  await page.click(':text("Test Permissions")');
  
  // go to recording
  await page.click('text=Time Travel');
  
  // assert recording loaded
  await expect(page.locator('text="Time Travel"')).toBeVisible( {timeout: 30000 });
  await expect(page.locator('text="DevTools"')).toBeVisible();
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await expect(page.locator('text="Console"')).toBeVisible();
  
  // nav to elements in devTools
  await page.click(".inspector-panel-button");
  await expect(page.locator('text="Layout"')).toBeVisible();
  
  // open console
  await page.click("text=Open Console");
  await expect(page.locator('text="Layout"')).toBeHidden();
  await expect(page.locator('text="Exceptions"')).toBeVisible();
  
  // close outline if opened already
  try {
    await expect(page.locator('text="Select a source to see available functions"')).toBeVisible();
    await page.click(':text("Outline")');
  } catch { e };
  
  // open outline
  await expect(page.locator('text="Select a source to see available functions"')).toBeHidden();
  await page.click("text=Open Outline");
  await expect(page.locator('text="Select a source to see available functions"')).toBeVisible();
  
  // open print statements
  await expect(page.locator('text="Breakpoints"')).toBeHidden();
  await expect(page.locator('text="Print Statements"')).toBeHidden();
  await page.click("text=Open Print Statements");
  await expect(page.locator('text="Breakpoints"')).toBeVisible();
  await expect(page.locator('text="Print Statements"')).toBeVisible();
  
  // open sources
  await expect(page.locator('text="Sources"')).toBeHidden();
  await expect(page.locator('text="demo"')).toBeHidden();
  await page.click("text=Open Sources");
  await expect(page.locator('text="Sources"')).toBeVisible();
  await expect(page.locator(".folder").first()).toBeVisible();

  process.exit();
})();