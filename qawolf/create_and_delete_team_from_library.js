const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 3 });
  await assertText(page, "Your Library");
  
  // ensure test team deleted
  const testTeamLink = await page.$("text=Test Team:");
  if (testTeamLink) {
    await testTeamLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
  }
  
  // create new team
  await page.click("text=Create new team");
  await assertText(page, "Team name");
  
  // enter team name
  const teamName = `Test Team: ${Date.now()}`;
  await page.fill('.space-y-3 [type="text"]', teamName);
  await page.click("text=Next");
  
  // assert taken to invite modal
  await assertText(page, "Invite team members");
  
  // try to invite invalid email address
  await page.fill('[placeholder="Email address"]', 'invalid');
  await page.click("button:has-text('Invite')");
  
  // assert error message shown
  await assertText(page, "Invalid email address");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  
  // assert team member invited via email
  await assertText(page, "Developer (pending)");
  await assertText(page, email);
  
  // continue team creation
  await page.click("text=Next");
  
  // assert team setup complete
  await assertText(page, "Team setup complete");
  await assertText(page, "Your new team is ready.");
  
  // go to new team
  await page.click("text=Take me to my team");
  const newTeamLibrary = page.locator(`span >> text=${teamName}`);
  await expect(newTeamLibrary).toHaveCount(1);
  await assertText(page, `${teamName} (Trial)`);
  
  // get invite information from email
  const { html, subject, text } = await waitForMessage({ timeout: 5 * 60000 });
  const inviteUrl = parseInviteUrl({ text });
  assert(html.includes(teamName));
  assert(subject.includes(teamName));
  assert(text.includes(`QA 2 Team has invited you to ${teamName}`));
  
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
  await page.click(`[title="${teamName}"]`);
  await page.click("text=settings");
  await assertText(page, "Team Members");
  
  // remove invite
  // await page.hover("text=Developer (pending)");
  // await page.click(".expand-dropdown");
  await page.click(':text("Developer (pending)expand_more")');
  await page.click("text=Remove");
  
  // confirm remove invite
  await assertText(page, "Remove team member?");
  await assertText(page, `Are you sure you want to remove ${email}`);
  await page.click("text=Remove them");
  await page.waitForTimeout(2000);
  await assertNotText(page, email);
  
  // delete team
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(2000);
  await assertNotText(page, teamName);

  process.exit();
})();