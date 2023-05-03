const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // REQ305 Airtable: log in
  const { page, browser } = await logInToAirtable({ permissions: ["clipboard-read", "clipboard-write"]});
  
  // navigate to designated workspace
  await page.click('[aria-label="Awesome Base"]');
  await page.waitForTimeout(2000);
  
  // REQ466 Airtable: Generate share view link
  await page.click('[aria-label="Share view"]');
  await page.click('[aria-label="Generate a new link"]', {force: true});
  await page.click(':text("Generate new link")');
  await page.waitForTimeout(2000);
  await page.click('.bg-light-gray-3 [type="text"]', {force: true});
  await page.waitForTimeout(2000);
  await page.dblclick('.bg-light-gray-3 [type="text"]', {force: true});
  await page.keyboard.press('Control+C');
  
  // REQ467 Airtable: View shared link works for anyone
  const copiedLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  const context = await browser.newContext();
  const page2 = await context.newPage();
  await page2.goto(copiedLink);
  await page2.waitForLoadState();
  
  // assert values
  await expect(page2.locator('[data-testid="viewName"]')).toHaveText("Grid view")
  await expect(page2.locator('[data-testid="navBarButtonInBase"]')).toHaveText("Sign up for free")
  await expect(page2.locator('[aria-label="Name column header (Single line text field)"]')).toBeVisible();
  await expect(page2.locator('[aria-label="Notes column header (Long text field)"]')).toBeVisible();
  await expect(page2.locator('[aria-label="Attachments column header (Attachment field)"]')).toBeVisible();
  await expect(page2.locator('[aria-label="Status column header (Single select field)"]')).toBeVisible();

  process.exit();
})();