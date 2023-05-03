const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // login
  const { page, browser } = await logInToAsana(
    "replay+asana@qawolf.email",
    process.env.ASANA_PASSWORD
  );
  
  // clean test
  while (await page.locator("text=QA Team").count()) {
    await page.click(`:text("QA Team")`);
    const text = await page.innerText("h1");
    await page.click('[aria-label="Show options"]');
    await page.waitForTimeout(500);
    await page.click("#delete_team");
    await page.click(':text("Delete team…")');
    await page.type('[name="DeleteTeamSettings-delete"]', text);
    await page.click(".DangerButton");
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await page.click('[aria-label="Close this notification"]');
    await page.waitForTimeout(1000);
  }
  
  // create team
  await page.click(':text("Create")');
  await page.click('[role="menu"] :text("Team")');
  const teamName = `QA Team ` + Date.now().toString().slice(-4);
  await page.fill(
    '[placeholder="For example: \\"Marketing\\" or \\"Design\\""]',
    teamName
  );
  await page.click(':text("Create new team")');
  
  // assert team
  await expect(page.locator(`text=${teamName}`)).toHaveCount(2);
  
  // delete team
  await page.click('[aria-label="Show options"]');
  await page.click(':text("Delete QA Team")');
  await page.click(':text("Delete team…")');
  await page.fill('[name="DeleteTeamSettings-delete"]', teamName);
  await page.click(".DangerButton");
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await page.click('[aria-label="Close this notification"]');
  
  // assert deleted
  await page.click(':text("Home")');
  await expect(page.locator(`text=${teamName}`)).toHaveCount(0);
  
  // upload replay
  await uploadReplay();
  

  process.exit();
})();