const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // log in and navigate to pricing
  const { browser, page } = await logIn({ userId: 3 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test team deleted
  var testTeamLink = await page.$("text=Test Team Linux:");
  try {
    await assertNotText(page, 'Test Team Linux:', {timeout: 7 * 1000});
  } catch (e) {
    await testTeamLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await assertNotText(page, 'Test Team Linux:', {timeout: 7 * 1000});
  };
  
  await page.goto("https://www.replay.io/pricing");
  
  // assert pricing page
  await assertText(page, "Pricing");
  
  // create new team
  await page.click('.is-mobile-0 [href="https://app.replay.io/team/new"]');
  
  // assert create team page
  await assertText(page, "Welcome to Replay");
  
  // navigate through create team flow
  await page.click("text=Create a team");
  
  // assert team name page
  await assertText(page, "What should we call you?");
  
  // set team name
  const teamName = `Test Team Linux: ${teamNumber}`;
  await page.fill('[type="text"]', teamName);
  await page.click("text=Next");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.click('button:text("Settings")');
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  await page.click(".modal-close");
  
  // assert on download page
  await assertText(page, "Download Replay");
  
  // download for Linux
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=Linux')
  ]);
  await page.waitForTimeout(5000);
  
  // get suggested file name
  var linuxDownloadName = download.suggestedFilename();
  
  // assert Linux download
  await page.waitForTimeout(2000);
  assert(linuxDownloadName.includes("linux-replay.tar.bz2"));
  
  // navigate to dashboard
  await page.goto(buildUrl('/')); // manually navigate to get around sign in
  
  // assert team created
  await assertText(page, teamName);
  
  // delete test team
  await page.click(`text=Test Team Linux: ${teamNumber}`);
  await page.click("text=settings");
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(3000);
  await assertNotText(page, teamName);

  process.exit();
})();