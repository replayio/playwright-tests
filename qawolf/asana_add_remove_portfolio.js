const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // login
  const { page, browser } = await logInToAsana(process.env.ASANA_EMAIL, process.env.ASANA_PASSWORD);
  
  // view portfoliio
  await page.click(':text("Portfolios")');
  await expect(page.locator("h1")).toHaveText("Portfolios")
  
  // clean test
  while (await page.locator("text=QA Portfolio").count()) {
    await page.click(`:text("QA Portfolio")`);
    await expect(page.locator(`text=QA Portfolio`)).toBeVisible({ timeout: 60000 });
    await page.click('[aria-label="Show options"]');
    await page.waitForTimeout(500);
    await page.click(':text("Delete Portfolio")');
    await page.click(':text("Delete Portfolio")');
    await page.waitForTimeout(1000);
  }
  
  // add new portfolio
  await page.click(':text("New Portfolio")');
  const portfolioName = `QA Portfolio ` + Date.now().toString().slice(-4);
  await page.fill('[placeholder="For example: \\"Marketing dashboard\\" or \\"Team objectives\\""]', portfolioName);
  await page.click(':text("Create Portfolio")');
  
  // assert portfolio
  await expect(page.locator(`text=${portfolioName}`)).toBeVisible();
  
  // delete portfolio
  await page.click('[aria-label="Show options"]');
  await page.waitForTimeout(500);
  await page.click(':text("Delete Portfolio")');
  await page.click(':text("Delete Portfolio")');
  
  // assert deleted
  await expect(page.locator(`text=${portfolioName}`)).toBeHidden();

  process.exit();
})();