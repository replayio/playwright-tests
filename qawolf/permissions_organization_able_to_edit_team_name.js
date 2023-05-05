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
  const { browser, page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test create organization deleted
  var testOrganizationLink = await page.$("text=Test Create Organization:");
  try {
    await expect(
      page.locator(':text("Test Create Organization:")')
    ).not.toBeVisible({ timeout: 7 * 1000 });
  } catch (e) {
    await testOrganizationLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await expect(
      page.locator(':text("Test Create Organization:")')
    ).not.toBeVisible({ timeout: 7 * 1000 });
  }
  
  await page.goto("https://www.replay.io/pricing");
  
  // assert pricing page
  await assertText(page, "Pricing");
  
  // create new organization
  await page.waitForTimeout(5000);
  await page.click(".plans_tabs__uqDtX button:nth-of-type(3)");
  
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click("#Organization .button_button___eDCW"),
  ]);
  // await page.click("#Organization .button_button___eDCW");
  
  // assert create organization page
  await assertText(page2, "Welcome to Replay,");
  
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
  await page2.click(
    ':text("settings"):right-of(:text("Test Create Organization"))'
  );
  await page2.fill('[placeholder="Email address"]', email);
  await page2.click("button:has-text('Invite')");
  await page2.click("#app-container .modal-close");
  
  // assert organization created
  await assertText(page2, organizationName);
  
  // change organization name
  await page2.click(
    ':text("settings"):right-of(:text("Test Create Organization"))'
  );
  await page2.click("li >> text='Profile'");
  await page2.fill('main [type="text"]', "Test Edit Organization");
  await page2.click(".modal-close");
  
  // assert name change
  await assertText(page2, "Test Edit Organization");
  await expect(page.locator(`:text("${organizationName}")`)).not.toBeVisible();
  
  // delete team
  await page2.click(
    ':text("settings"):right-of(:text("Test Edit Organization"))'
  );
  await page2.click(':text("Delete Team")');
  await page2.click('main button:text("Delete this team")');
  await page2.click('[role="dialog"] button:nth-of-type(2)');
  await expect(page.locator(`:text("Test Edit Organization")`)).not.toBeVisible();
  

  process.exit();
})();