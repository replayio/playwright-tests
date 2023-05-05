const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Create team and invite team members";

  // log in and navigate to pricing  
  const { browser, page } = await logIn({ userId: 3 });  
  await assertText(page, "Your Library");  
  const teamNumber = Date.now();  
    
  // update ensure test team deleted  
  await expect(page.locator(".font-semibold")).toContainText("Your Library")  
  while (await page.locator('text=Test Team Blue:').count()) {  
    await page.click(`text=Test Team Blue:`);  
    await page.click("text=settings");  
    await deleteTeam({ page });  
    await page.waitForTimeout(3000);  
  }  
    
  // goto pricing page  
  await page.goto("https://www.replay.io/pricing");  
  await assertText(page, "Pricing");  
    
  // create new team  
  const [page2] = await Promise.all([  
    page.waitForEvent("popup"),  
    page.click('.hero_slide__AJNo_ [href="https://app.replay.io/team/new"]'),  
  ]);  
    
  // assert create team page  
  await assertText(  
    page2,  
    "Welcome to Replay, the new way to record, replay, and debug web applications"  
  );  
    
  // navigate through create team flow  
  await page2.click("text=Create a team");  
    
  // assert team name page  
  await assertText(page2, "What should we call you?");  
    
  // set team name  
  const teamName = `Test Team Blue: ${teamNumber}`;  
  await page2.fill('[type="text"]', teamName);  
  await page2.click("text=Next");  
    
  // assert team created  
  await assertText(page2, teamName);  
    
  // invite team member with valid email address  
  const { email, waitForMessage } = getInbox({ new: true });  
  await page2.click('button:text("Settings")');  
  await page2.fill('[placeholder="Email address"]', email);  
  await page2.click("button:has-text('Invite')");  
  await page2.click(".modal-close");  
    
  // get invite information from email  
  const { html, subject, text } = await waitForMessage({  
    timeout: 5 * 60 * 1000,  
  });  
  const inviteUrl = parseInviteUrl({ text });  
  assert(html.includes(teamName));  
  assert(subject.includes(teamName));  
  assert(text.includes(`QA 2 Team has invited you to ${teamName}`));  
    
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
    
  // delete test team  
  await page2.click(`text=Test Team Blue: ${teamNumber}`);  
  await page2.click("text=settings");  
  await deleteTeam({ page: page2 });  
    
  // assert team deleted  
  await expect(page2.locator('text=Test Team Blue:')).not.toBeVisible()  
  

  process.exit();
})();