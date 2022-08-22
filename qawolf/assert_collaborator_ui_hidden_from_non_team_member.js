const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // test helpers
  const url = buildUrl(
    "/recording/collaborator-ui-recording--550df1bf-274c-48c5-8e99-052a02719f0a"
  );
  
  // log in
  const { page } = await logIn({ userId: 11 });
  await assertText(page, "Library");
  
  // go to recording
  await page.goto(url);
  
  // assert recording loaded
  await assertText(page, "Collaborator UI Recording");
  await assertText(page, "DevTools");
  
  // try to add collaborator
  await page.click("text=ios_shareShare");
  
  // assert share modal opened
  await assertElement(page, ".sharing-modal");
  
  // assert collaborator UI is hidden
  const emailInput = page.locator('[placeholder="Email address"]');
  await expect(emailInput).toHaveCount(0);
  

  process.exit();
})();