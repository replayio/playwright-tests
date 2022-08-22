const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await page.click(':text("Test Permissions")');
  await page.click('[href="/recording/private-recording-test--149e2344-f94b-4095-a760-d9c67d5b4277"]');
  await page.click(':text("ViewerDevTools")');
  
  // show console exceptions
  await page.click("#show-exceptions");
  
  // assert correct error message is shown in console 
  await page.waitForTimeout(10 * 1000); // give console time to load data
  await expect(page.locator(':text("exports")')).toHaveCount(19);

  process.exit();
})();