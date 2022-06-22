const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 11 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test organization deleted
  var testOrganizationLink = await page.$("text=Test Create Organization Mac:");
  try {
    await assertNotText(page, 'Test Create Organization Mac', {timeout: 7 * 1000});
  } catch (e) {
    await testOrganizationLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await assertNotText(page, 'Test Create Organization Mac', {timeout: 7 * 1000});
  };
  await page.goto("https://www.replay.io/pricing");
  
  // assert pricing page
  await assertText(page, "Pricing");
  
  // create new organization
  await page.click("text=Create Organization");
  
  // assert create organization page
  await page.waitForTimeout(3000);
  await assertText(page, "Welcome to Replay, the new way to record, replay, and debug web applications");
  
  // navigate through create organization flow
  await page.click("text=Create an organization");
  
  // assert organization name page
  await assertText(page, "What should we call you?");
  
  // set organization name
  const organizationName = `Test Create Organization Mac: ${teamNumber}`;
  await page.fill('[type="text"]', organizationName);
  await page.click("text=Next");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  await page.click("text=Next");
  
  // assert on download page
  await assertText(page, "Download Replay");
  
  // download for Mac
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=Mac')
  ]);
  await page.waitForTimeout(5000);
  
  // get suggested file name
  var macDownloadName = download.suggestedFilename();
  await page.waitForTimeout(2000);
  
  // assert Mac download
  assert(macDownloadName.includes("replay.dmg"));
  
  // navigate to dashboard
  await page.goto(buildUrl('/')); // manually navigate to get around sign in
  
  // assert organization created
  await assertText(page, organizationName);
  
  // delete test organization
  await page.click(`text=Test Create Organization Mac: ${teamNumber}`);
  await page.click("text=settings");
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(2000);
  await assertNotText(page, organizationName);

  process.exit();
})();