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
  openPopup
} = require("./helpers");

(async () => {
  // BUG: Create organisation invite window closes immediately - https://qa-wolf.monday.com/boards/2150171022/pulses/2883586418
  
  // log in
  const { browser, page } = await logIn({ userId: 9 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test organization deleted
  var testOrganizationLink = await page.$("text=Test Create Organization Windows:");
  try {
    await assertNotText(page, 'Test Create Organization Windows', {timeout: 7 * 1000});
  } catch (e) {
    await testOrganizationLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await assertNotText(page, 'Test Create Organization Windows', {timeout: 7 * 1000});
  };
  await page.goto("https://www.replay.io/pricing");
  
  // assert pricing page
  await assertText(page, "Pricing");
  
  // create new organization
  await page.click("text=Create Organization");
  
  // assert create organization page
  await assertText(page, "Welcome to Replay");
  
  // navigate through create organization flow
  await page.click("text=Create an organization");
  
  // assert organization name page
  await assertText(page, "What should we call you?");
  
  // set organization name
  const organizationName = `Test Create Organization Windows: ${teamNumber}`;
  await page.fill('[type="text"]', organizationName);
  await page.click("text=Next");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  await page.click("text=Next");
  
  // assert on download page
  await assertText(page, "Download Replay");
  
  // download for Windows
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=Windows')
  ]);
  await page.waitForTimeout(5000);
  
  // get suggested file name
  var windowsDownloadName = download.suggestedFilename();
  await page.waitForTimeout(2000);
  
  // assert Windows download
  assert(windowsDownloadName.includes("windows-replay.zip"));
  
  // navigate to dashboard
  await page.goto(buildUrl('/')); // manually navigate to get around sign in
  
  // assert organization created
  await assertText(page, organizationName);
  
  // delete test organization
  await page.click(`text=Test Create Organization Windows: ${teamNumber}`);
  await page.click("text=settings");
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(2000);
  await assertNotText(page, organizationName);

  process.exit();
})();