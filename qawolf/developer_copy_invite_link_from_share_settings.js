const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 10 });
  await expect(page.locator('text="Your Library"')).toHaveCount(2);
  
  // go to team
  await page.click(':text("Test Permissions")');
  
  // assert replays available
  // await expect(page.locator('text="Great Scott"')).toBeVisible();
  await expect(page.locator('text="Time Travel"')).toBeVisible();
  
  // go to replay
  await page.click('text=Time Travel');
  
  // assert replay loaded
  await expect(page.locator(':text("Time Travel")')).toBeVisible( { timeout: 30 * 1000 });
  await expect(page.locator('text="DevTools"')).toBeVisible();
  
  // go to share settings
  await page.click("text=ios_shareShare");
  
  // assert share settings modal openend
  await expect(page.locator('text="Add People"')).toBeVisible();
  await expect(page.locator('text="Privacy Settings"')).toBeVisible();
  
  // ensure privacy set to private
  const privateButton = page.locator('section:nth-of-type(2) [type="button"] >> text=Test Permissions can view');
  const publicButton = page.locator('section:nth-of-type(2) [type="button"] >> text=Anyone with the link can view');
  const publicLink = page.locator('[role="menuitem"] >> text=Anyone with the link');
  const privateLink = page.locator('[role="menuitem"] >> text=Members of Test Permissions');
  
  if (await privateButton.count()) {
    // assert privacy settings button enabled
    await expect(privateButton).not.toBeDisabled();
  } else {
    await page.click('.space-y-1 [type="button"]');
    await privateLink.click();
    await expect(privateButton).toBeVisible();
  };
  
  // open privacy settings
  await privateButton.click();
  
  // assert privacy settings opened
  await expect(publicLink).toBeVisible();
  await expect(privateLink).toBeVisible();
  
  // change privacy setting
  await publicLink.click();
  
  // assert public privacy setting
  await expect(publicButton).toBeVisible();
  
  // change back to private setting
  await publicButton.click();
  await privateLink.click();
  
  // assert privacy set to private
  await expect(privateButton).toBeVisible();
  await expect(publicButton).not.toBeVisible();
  
  // copy invite link
  await page.click("text=Copy Link");
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // assert link copied to clipboard
  await expect(page.locator('text="Copied"')).toBeVisible();
  expect(copiedLink).toEqual(buildUrl('/recording/time-travel--4dd31ea6-e332-4973-9c45-7014cd94fefb'));
  
  // go to link
  const page2 = await browser.newPage();
  await page2.goto(copiedLink);
  
  // assert page opened with correct url
  expect(page2.url()).toEqual(buildUrl('/recording/time-travel--4dd31ea6-e332-4973-9c45-7014cd94fefb'));

  process.exit();
})();