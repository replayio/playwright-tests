const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.checklyhq.com/');
  
  // log in
  await page.click("text=Log in");
  await page.fill('[aria-label="Email"]', "replay+checkly@qawolf.email");
  await page.fill('[aria-label="Password"]', process.env.DEFAULT_PASSWORD);
  await page.click('[aria-label="Log In"]');
  
  // assert log in
  await assertElement(page, "text=Test Wolf");
  await assertNotText(page, "Log in");
  
  // create group
  await page.click("#create-check-button");
  
  // close the survey button
  try {
    await page.click('[aria-label="Survey"] button'); 
  } catch {}
  
  // click group under create group
  await page.click(".add-group-button");
  
  // assert group created
  await assertText(page, "No checks in this group yet!");
  
  // add check
  await page.click("text=Add checks to group");
  await page.click("text=Add existing check(s)");
  await page.click("th label");
  await page.click(".button--primary");
  
  // run api check
  await page.click("text=Run all checks");
  
  // assert new api check runs
  await assertElement(page, ".status-circle--success");
  
  // delete api check from group
  await page.click(".checks-list-item button");
  await page.click("text=Remove check from Group");
  await page.click(':text("Remove from group")');

  process.exit();
})();