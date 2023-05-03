const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await expect(page.locator("text=Test Permissions")).toBeVisible();
  
  // go to replay
  await page.click(':text("Test Team")');
  await page.click(
    '[href="/recording/log-in-and-out-pr-deployment--64837de3-6e11-4cb2-a44d-197f6a8d3d67"]'
  );
  
  // assert replay loaded
  try {
    await expect(page.locator('text="Comments"')).toBeVisible({ timeout: 5000 });
  } catch {
    await expect(page.locator('text="Info"')).toBeVisible({ timeout: 5000 });
  }
  
  // nav to settings
  await page.click(':text("more_horiz")');
  await page.click(':text("Settings")');
  await expect(page.locator('text="Theme"')).toBeVisible();
  
  // dark mode
  await page.click('[aria-haspopup="true"]');
  await page.click(':text("Dark")');
  await expect(page.locator(".modal-content")).toHaveCSS(
    "color",
    "rgb(215, 215, 219)"
  );
  
  // light mode
  await page.click('[aria-haspopup="true"]');
  await page.click(':text("Light")');
  await expect(page.locator(".modal-content")).toHaveCSS(
    "color",
    "rgb(56, 56, 61)"
  );
  
  // reset to system (default)
  await page.click('[aria-haspopup="true"]');
  await page.click(':text("System")');
  

  process.exit();
})();