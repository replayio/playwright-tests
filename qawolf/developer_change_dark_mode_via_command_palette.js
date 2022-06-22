const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await expect(page.locator('text=Test Permissions')).toBeVisible();
  
  // go to replay
  await page.click('[href="/recording/log-in-and-out-pr-deployment-replay-qa-wolf--924c1067-3cff-43fd-ad35-39a1e350c5f1"]');
  
  // switch to devtools
  await page.click(':text("ViewerDevTools")');
  
  // select what to do
  await page.fill('[placeholder="What would you like to do?"]', "toggle Dark Mode");
  await page.click(':text("Toggle Dark ModeShift+T")');
  
  // reset dark mode
  try {
    await expect(page.locator(".sources-pane")).toHaveCSS('color', "rgb(56, 56, 61)");
  } catch {
    await page.click(':text("Toggle Dark ModeShift+T")');
  };
  await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS('color', "rgb(56, 56, 61)");
  
  // toggle dark mode
  await page.click(':text("Toggle Dark ModeShift+T")');
  await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS('color', "rgb(215, 215, 219)");
  
  // reset dark mode
  try {
    await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS('color', "rgb(56, 56, 61)");
  } catch {
    await page.click(':text("Toggle Dark ModeShift+T")');
  };
  await expect(page.locator(".sources-pane >> nth=1")).toHaveCSS('color', "rgb(56, 56, 61)");

  process.exit();
})();