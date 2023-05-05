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
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test create organization deleted
  await expect(page.locator(".font-semibold")).toContainText("Your Library")
  while (await page.locator('text=Test Create Organization:').count()) {
    await page.click(`text=Test Create Organization:`);
    await page.click("text=settings");
    await deleteTeam({ page });
    await page.waitForTimeout(3000);
  }
  
  // goto pricing page
  await page.goto("https://www.replay.io/pricing");
  await assertText(page, "Pricing");
  
  // create new organization
  await page.click(".plans_tabs__uqDtX button:nth-of-type(3)");
  await page.waitForTimeout(5000);
  
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("#Organization a"),
  ]);
  
  // navigate through create organization flow
  await page2.click("text=Create an organization");
  
  // assert organization name page
  await assertText(page2, "What should we call you?");
  
  // set organization name
  const organizationName = `Test Create Organization: ${teamNumber}`;
  await page2.fill('[type="text"]', organizationName);
  await page2.click("text=Next");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page2.click('button:text("settings")');
  await page2.fill('[placeholder="Email address"]', email);
  await page2.click("button:has-text('Invite')");
  await page2.click(".modal-close");
  
  // assert organization created
  await assertText(page2, organizationName);
  
  // get invite information from email
  const { html, subject, text } = await waitForMessage({
    timeout: 5 * 60 * 1000,
  });
  const inviteUrl = parseInviteUrl({ text });
  assert(html.includes(organizationName));
  assert(subject.includes(organizationName));
  assert(text.includes(`QA Wolf has invited you to ${organizationName}`));
  
  // accept invite
  const context3 = await browser.newContext();
  const page3 = await context3.newPage();
  await page3.bringToFront();
  await page3.goto(inviteUrl);
  
  // assert taken to accept invite flow
  await assertText(page3, "Almost there!");
  await assertText(
    page3,
    "In order to join your team, we first need you to sign in."
  );
  await assertText(page3, "Sign in with Google");
  
  // open team settings
  await page2.bringToFront();
  
  // delete test Create organization
  await page2.click("text=settings");
  await deleteTeam({ page: page2 });
  
  // assert team deleted
  await page2.waitForTimeout(2000);
  await expect(page2.locator('text=Test Create Organization:')).not.toBeVisible()
  

  process.exit();
})();