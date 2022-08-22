const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test create organization deleted
  var testOrganizationLink = await page.$("text=Test Create Organization:");
  try {
    await assertNotText(page, 'Test Create Organization:', { timeout: 7 * 1000 });
  } catch (e) {
    await testOrganizationLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await assertNotText(page, 'Test Create Organization:', { timeout: 7 * 1000 });
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
  const organizationName = `Test Create Organization: ${teamNumber}`;
  await page.fill('[type="text"]', organizationName);
  await page.click("text=Next");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.click('button:text("settings")');
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  await page.click(".modal-close");
  
  // assert organization created
  await assertText(page, organizationName);
  
  // get invite information from email
  const { html, subject, text } = await waitForMessage({ timeout: 5 * 60 * 1000 });
  const inviteUrl = parseInviteUrl({ text });
  assert(html.includes(organizationName));
  assert(subject.includes(organizationName));
  assert(text.includes(`QA Wolf has invited you to ${organizationName}`));
  
  // accept invite
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(inviteUrl);
  
  // assert taken to accept invite flow
  await assertText(page2, "Almost there!");
  await assertText(page2, "In order to join your team, we first need you to sign in.");
  await assertText(page2, "Sign in with Google");
  
  // open team settings
  await page.bringToFront();
  
  // delete test Create organization
  // await page.click(`text=Test Create Organization: ${teamNumber}`);
  await page.click("text=settings");
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(2000);
  await assertNotText(page, organizationName);

  process.exit();
})();