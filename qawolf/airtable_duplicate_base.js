const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // clean test
  while (await page.locator("text=Awesome Base copy").count()) {
    await page.click('[aria-label="Awesome Base copy"]', {button: "right"});
    await page.click(':text("Delete base")');
    await page.click(".focusFirstInModal");
    await page.waitForTimeout(500);
  }
  
  // REQ468 Airtable: Duplicate Base
  await page.click('[aria-label="Awesome Base"]', {button: "right"});
  await page.click(':text("Duplicate base")');
  await page.waitForTimeout(500);
  await page.click(':text("Duplicate base")');
  
  await expect(page.locator('text=Awesome Base copy')).toBeVisible();
  
  // REQ452 Airtable: Delete base
  await page.click('[aria-label="Awesome Base copy"]', {button: "right"});
  await page.click(':text("Delete base")');
  await page.waitForTimeout(500);
  await page.click(".focusFirstInModal");
  
  await page.waitForTimeout(4000);
  await expect(page.locator('text=copy')).toBeHidden();

  process.exit();
})();