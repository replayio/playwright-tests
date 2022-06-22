const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  //  log in
  const { page } = await logIn({ userId: 6 });
  await page.goto(buildUrl('/recording/qa-wolf--f4bdbfba-6072-48ec-8978-f06e94551d4d'));
  
  
  // asssert viewing replay
  await assertText(page, "Viewer");
  
  // launch Replay dialog
  await page.waitForTimeout(2000);
  await page.click(".expand-dropdown");
  await page.click("text=Launch Replay");
  
  // assert lanch dialog appears
  expect(page.locator('text=Launching Replay ...'))
    .toBeVisible();
  await expect(page.locator('text=Click Open Replay in the dialog shown by your browser'))
    .toBeVisible();
  await expect(page.locator("text=Don't have Replay yet? Download it on Mac, Linux, and Windows"))
    .toBeVisible();
  
  // assert download links
  const macLink = await page.getAttribute("text=Mac", 'href');
  const linuxLink = await page.getAttribute("text=Linux", 'href');
  const windowsLink = await page.getAttribute("text=Windows", 'href');
  expect(macLink).toEqual('https://static.replay.io/downloads/replay.dmg');
  expect(linuxLink).toEqual('https://static.replay.io/downloads/linux-replay.tar.bz2');
  expect(windowsLink).toEqual('https://static.replay.io/downloads/windows-replay.zip');

  process.exit();
})();