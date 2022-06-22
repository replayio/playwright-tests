const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 8 });
  await assertText(page, "Your Library");
  
  // go to team settings
  await page.click("text=Test Invite team");
  await page.click("text=settings");
  
  // go to team members
  await page.click("text=Team Members");
  
  // assert team settings loaded
  const h1 = page.locator('main h1');
  const inviteButton = page.locator('form button');
  await expect(h1).toHaveText('Team Members');
  await expect(inviteButton).toHaveText('Invite');
  
  // try to invite invalid email address
  await page.fill('[placeholder="Email address"]', 'invalid');
  await page.click("button:has-text('Invite')");
  
  // assert error message shown
  const errorMessage = page.locator('.text-red-500');
  await expect(errorMessage).toHaveText("Invalid email address");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  
  // assert team member invited via email
  const developerDropdown = page.locator(`.expand-dropdown:right-of(:text("${email}")) >> nth=1`);
  const invitedEmail = page.locator(`text=${email}`);
  expect(await developerDropdown.innerText()).toMatch('Developer (pending)');
  await expect(invitedEmail).toHaveText(email);
  
  // get invite information from email
  const { html, subject, text } = await waitForMessage({ timeout: 2 * 60 * 1000 });
  const inviteUrl = parseInviteUrl({ text });
  assert(html.includes('Test Invite team'));
  assert(subject.includes('Test Invite team'));
  assert(text.includes('QA Wolf has invited you to Test Invite team'));
  
  // accept invite
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(inviteUrl);
  
  // assert taken to accept invite flow
  const page2H1 = page2.locator('h1');
  const page2Paragraph = page2.locator('div p');
  const page2Button = page2.locator('button:has-text("Sign in with Google")');
  await expect(page2H1).toHaveText("Almost there!");
  await expect(page2Paragraph).toHaveText("In order to join your team, we first need you to sign in.");
  await expect(page2Button).toBeVisible();
  
  // remove invite
  await page.bringToFront();
  await page.click(`.expand-dropdown:right-of(:text("${email}"))`);
  await page.click("text=Remove");
  
  // confirm remove invite
  const modalH1 = page.locator('[role="dialog"] h1');
  const modalParagraph = page.locator('[role="dialog"] p');
  await expect(modalH1).toHaveText("Remove team member?");
  await expect(modalParagraph).toHaveText(`Are you sure you want to remove ${email} from this team?`);
  await page.click("text=Remove them");
  await page.waitForTimeout(2000);
  await expect(invitedEmail).not.toBeVisible();

  process.exit();
})();