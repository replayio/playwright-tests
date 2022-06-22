const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click('text=Great Scott');
  
  // assert recording loaded
  await assertText(page, 'Great Scott');
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  
  // open privacy info
  const privacyInfoCookies = page.locator('text=Cookies');
  await expect(privacyInfoCookies).toHaveCount(0);
  const privacyInfoStorage = page.locator('text=Local Storage');
  await expect(privacyInfoStorage).toHaveCount(0);
  const privacyInfoScripts = page.locator('text=Executed Scripts');
  await expect(privacyInfoStorage).toHaveCount(0);
  await page.click("text=Show Privacy");
  
  // assert privacy info opened
  await expect(privacyInfoCookies).toHaveCount(1);
  await expect(privacyInfoStorage).toHaveCount(1);
  await expect(privacyInfoStorage).toHaveCount(1);
  
  // follow learn more link
  const [ page2 ] = await Promise.all([
    page.waitForEvent('popup'),
    page.click("text=Learn more")
  ]);
  
  // assert security and privacy page loaded
  await assertText(page2, "Security & Privacy");
  await assertText(page2, "Additional Information");
  expect(page2.url()).toEqual('https://www.replay.io/security-privacy');

  process.exit();
})();