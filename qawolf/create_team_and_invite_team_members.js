const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in and navigate to pricing  
  const { browser, page } = await logIn({ userId: 3 });  
  await assertText(page, "Your Library");  
  const teamNumber = Date.now();  
    
  // ensure test team deleted  
  var testTeamLink = await page.$("text=Test Team Blue:");  
  try {  
    await assertNotText(page, "Test Team Blue:", { timeout: 7 * 1000 });  
  } catch (e) {  
    await testTeamLink.click();  
    await page.click("text=settings");  
    await deleteTeam({ page });  
    await assertNotText(page, "Test Team Blue:", { timeout: 7 * 1000 });  
  }  
  await page.goto("https://www.replay.io/pricing");  
    
  // assert pricing page  
  await assertText(page, "Pricing");  
    
  // create new team  
  await page.click('.is-mobile-0 [href="https://app.replay.io/team/new"]');  
    
  // assert create team page  
  await assertText(page, "Welcome to Replay");  
    
  // navigate through create team flow  
  await page.click("text=Create a team");  
    
  // assert team name page  
  await assertText(page, "What should we call you?");  
    
  // set team name  
  const teamName = `Test Team Blue: ${teamNumber}`;  
  await page.fill('[type="text"]', teamName);  
  await page.click("text=Next");  
    
  // assert team created  
  await assertText(page, teamName);  
    
  // invite team member with valid email address  
  const { email, waitForMessage } = getInbox({ new: true });  
  await page.click('button:text("Settings")');  
  await page.fill('[placeholder="Email address"]', email);  
  await page.click("button:has-text('Invite')");  
  await page.click(".modal-close");  
    
  // get invite information from email  
  const { html, subject, text } = await waitForMessage({  
    timeout: 5 * 60 * 1000,  
  });  
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
  await assertText(  
    page2,  
    "In order to join your team, we first need you to sign in."  
  );  
  await assertText(page2, "Sign in with Google");  
    
  // open team settings  
  await page.bringToFront();  
    
  // delete test team  
  await page.click(`text=Test Team Blue: ${teamNumber}`);  
  await page.click("text=settings");  
  await deleteTeam({ page });  
    
  // assert team deleted  
  await assertNotText(page, teamName);  
  

  process.exit();
})();