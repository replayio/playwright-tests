const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, "Library");
  
  // go to airtable replay (should have a large number of exceptions)
  await page.click('[href="/recording/playwright-test-teams-airtable--69bdd408-b9bf-49a4-b914-608e92c026ce"]');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  
  // show console exceptions
  await page.click('[data-test-id="ConsoleMenuToggleButton"]');
  await page.check('[data-test-id="FilterToggle-exceptions"] [type="checkbox"]');
  
  // assert warning icon is shown
  const warningIcon = page.locator('[data-test-id="ConsoleFilterToggles"] [title="There are too many exceptions. Please focus to a smaller time range and try again."]');
  await expect(warningIcon).toBeVisible({ timeout: 60 * 1000 });
  // 🐺 QA Wolf will create code here
  
  // hover warning icon and assert error message
  await warningIcon.hover({ force: true });
  await expect(
    page.locator(
      '[title="There are too many exceptions. Please focus to a smaller time range and try again."]'
    )
  ).toBeVisible();
  
  // hide exceptions
  await page.click('[data-test-id="FilterToggle-exceptions"] #FilterToggle-exceptions');
  
  // assert exceptions hidden
  await expect(warningIcon).not.toBeVisible();
  await expect(
    page.locator(
      '[title="There are too many exceptions. Please focus to a smaller time range and try again."]'
    )
  ).not.toBeVisible();
  

  process.exit();
})();