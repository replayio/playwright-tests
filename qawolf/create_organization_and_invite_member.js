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
  // log in
  const { browser, context, page } = await logIn({ userId: 7 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test organization deleted
  var testOrganizationLink = await page.$("text=Test Create Organization Linux:");
  try {
    await assertNotText(page, "Test Create Organization Linux:", {
      timeout: 7000,
    });
  } catch (e) {
    await testOrganizationLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await assertNotText(page, "Test Create Organization Linux:", {
      timeout: 7000,
    });
  }
  
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
  const organizationName = `Test Create Organization Linux: ${teamNumber}`;
  await page.fill('[type="text"]', organizationName);
  await page.click("text=Next");
  
  // assert organization created
  await assertText(page, organizationName);
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.click(
    ':text("settings"):right-of(:text("Test Create Organization"))'
  );
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  await page.click(".modal-close");
  
  // MAINTENANCE: NEED TO CHECK EMAIL AND FOLLOW LINK
  const { subject } = await waitForMessage();
  expect(subject).toBe(
    `QA Wolf invited you to join the ${organizationName} team`
  );
  
  // delete test organization
  await page.click(`text=Test Create Organization Linux: ${teamNumber}`);
  await page.click("text=settings");
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(2000);
  await assertNotText(page, organizationName);
  

  process.exit();
})();