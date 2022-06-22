const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // New behavior:
  // https://qawolfhq.slack.com/archives/C02GEJCC9JP/p1653067027708289?thread_ts=1653066967.262299&cid=C02GEJCC9JP
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await page.goto(buildUrl("/recording/7c05aa57-7ceb-4d40-ab05-bc435f704941"));
  await page.waitForTimeout(10 * 1000); // give console time to load data
  
  // show console exceptions
  await page.click("#show-exceptions");
  
  // assert warning icon is shown
  const warningIcon = page.locator(':text("⚠")');
  await expect(warningIcon).toBeVisible();
  
  // hover warning icon and assert error message
  await warningIcon.hover({ force: true });
  await expect(
    page.locator(
      '[title="There are too many exceptions. Please focus to a smaller time range and try again."]'
    )
  ).toBeVisible();
  
  // hide exceptions
  await page.click("#show-exceptions");
  
  // assert exceptions hidden
  await expect(warningIcon).not.toBeVisible();
  await expect(
    page.locator(
      '[title="There are too many exceptions. Please focus to a smaller time range and try again."]'
    )
  ).not.toBeVisible();
  

  process.exit();
})();