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
  // log in
  const { browser, page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test team deleted
  const testTeamLink = await page.$("text=Test Team Best:");
  try {
    await expect(page.locator(`:text("Test Team Best:")`)).not.toBeVisible({
      timeout: 7000,
    });
  } catch {
    await testTeamLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await expect(page.locator(`:text("Test Team Best:")`)).not.toBeVisible({
      timeout: 7000,
    });
  }
  
  // create new team
  await page.click("text=Create new team");
  await assertText(page, "Team name");
  
  // enter team name
  const teamName = `Test Team Best: ${teamNumber}`;
  await page.fill('.space-y-3 [type="text"]', teamName);
  await page.click("text=Next");
  
  // assert taken to invite modal
  await assertText(page, "Invite team members");
  
  // copy invite link
  var inviteLink = await getValue(page, '.flex-col.items-center [type="text"]');
  
  // open invite link
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(inviteLink);
  
  // assert taken to accept invite flow
  await assertText(page2, "Sign in with Google");
  
  // navigate through log in flow
  await page2.click("button:has-text('Sign in with Google')");
  
  // assert log in flow with Google
  await assertText(page2, "Sign in to continue to Replay");
  
  // close second page
  await page2.close();
  
  // set access with email domain
  await page.click("#domain-limited");
  
  // copy invite link
  var restrictedInviteLink = await getValue(
    page,
    '.flex-col.items-center [type="text"]'
  );
  
  // open invite link with domain restriction
  const context3 = await browser.newContext();
  const page3 = await context3.newPage();
  await page3.bringToFront();
  await page3.goto(restrictedInviteLink);
  
  // assert taken to accept invite flow
  await assertText(page3, "Sign in with Google");
  
  // navigate through log in flow
  await page3.click("button:has-text('Sign in with Google')");
  
  // assert log in flow with Google
  await assertText(page3, "Sign in to continue to Replay");
  
  // close third page
  await page3.close();
  
  // finish invite flow
  await page.click("text=Next");
  
  // navigate to team page
  await page.click("text=Take me to my team");
  await page.waitForSelector(`span:has-text("Test Team Best:")`);
  const newTeamLibrary = page.locator(`span >> text=${teamName}`);
  await expect(newTeamLibrary).toHaveCount(2);
  
  // delete team
  await page.click("text=settings");
  await deleteTeam({ page });
  
  // assert team deleted
   await expect(page.locator(`:text("${teamName}")`)).not.toBeVisible({
      timeout: 7000,
    });
  

  process.exit();
})();