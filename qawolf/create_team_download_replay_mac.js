const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Create team: download Replay: Mac";

  // BUG: Create team/organisation invite window closes immediately - https://qa-wolf.monday.com/boards/2150171022/pulses/2883586418
  
  // log in and navigate to pricing
  const { browser, page } = await logIn({ userId: 6 });
  await assertText(page, "Your Library");
  const teamNumber = Date.now();
  
  // ensure test team deleted
  var testTeamLink = await page.$("text=Test Team Mac:");
  try {
    await assertNotText(page, 'Test Team Mac:', {timeout: 7 * 1000});
  } catch (e) {
    await testTeamLink.click();
    await page.click("text=settings");
    await deleteTeam({ page });
    await assertNotText(page, 'Test Team Mac:', {timeout: 7 * 1000});
  };
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
  const teamName = `Test Team Mac: ${teamNumber}}`;
  await page.fill('[type="text"]', teamName);
  await page.click("text=Next");
  
  // invite team member with valid email address
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.click("button:has-text('Invite')");
  
  await page.click("text=Next");
  
  // assert on download page
  await assertText(page, "Download Replay");
  
  // download for Mac
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.click('text=Mac')
  ]);
  await page.waitForTimeout(5000);
  
  // get suggested file name
  var macDownloadName = download.suggestedFilename();
  await page.waitForTimeout(2000);
  
  // assert Mac download
  assert(macDownloadName.includes("replay.dmg"));
  
  // navigate to dashboard
  await page.goto(buildUrl('/')); // manually navigate to get around sign in
  
  // assert team created
  await assertText(page, teamName);
  
  // delete test team
  await page.click(`text=Test Team Mac: ${teamNumber}`);
  await page.click("text=settings");
  await deleteTeam({ page });
  
  // assert team deleted
  await page.waitForTimeout(3000);
  await assertNotText(page, teamName);

  process.exit();
})();