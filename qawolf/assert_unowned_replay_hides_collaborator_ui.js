const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // helper
  // userID 6 owns this recording
  const url = buildUrl('/recording/qa-wolf--f4bdbfba-6072-48ec-8978-f06e94551d4d')
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording url
  await page.goto(url);
  await page.waitForTimeout(3000);
  
  // assert recording loaded
  const recordingName = page.locator('text=QA Wolf');
  await expect(recordingName).toBeVisible({timeout: 30000});
  
  // try to add collaborator
  await page.click("text=ios_shareShare");
  
  // assert share modal opened
  await assertElement(page, ".sharing-modal");
  
  // assert collaborator UI is hidden
  const emailInput = page.locator('[placeholder="Email address"]');
  const collaboratorText = page.locator('text=Collaborator');
  await expect(emailInput).toHaveCount(0);
  await expect(collaboratorText).toHaveCount(0);

  process.exit();
})();