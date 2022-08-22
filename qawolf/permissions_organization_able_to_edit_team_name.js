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
  await page.click(':text("settings"):right-of(:text("Test Create Organization"))');
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  await page.click("#app-container .modal-close");
  
  // assert organization created
  await assertText(page, organizationName);
  
  // change organization name
  await page.click(':text("settings"):right-of(:text("Test Create Organization"))');
  await page.click("li >> text='Profile'");
  await page.fill('main [type="text"]', "Test Edit Organization");
  await page.click(".modal-close");
  
  // assert name change
  await assertText(page, "Test Edit Organization");
  await assertNotText(page, organizationName);
  
  // delete team
  await page.click(':text("settings"):right-of(:text("Test Edit Organization"))');
  await page.click(':text("Delete Team")');
  await page.click('main button:text("Delete this team")');
  await page.click('[role="dialog"] button:nth-of-type(2)');
  await assertNotText(page, "Test Edit Organization"); 

  process.exit();
})();