const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.replay.io/');
  
  // assert home page loaded
  await assertText(page, 'Download Replay');
  
  // download for Linux
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('.os-linux [href="https://static.replay.io/downloads/linux-replay.tar.bz2"]')
  ]);
  
  // assert downlaod started
  await assertText(page, 'Now downloading for Linux...');
  await page.waitForTimeout(5000);
  
  // get suggested file name
  var linuxDownloadName = download.suggestedFilename();
  
  // assert Linux download
  assert(linuxDownloadName.includes('linux-replay.tar.bz2'));

  process.exit();
})();