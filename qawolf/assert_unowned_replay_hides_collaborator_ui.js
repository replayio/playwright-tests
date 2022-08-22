const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // If this test fails on "assert collaborator UI is hidden", make 
  //  sure the replay has been recorded recently (no older than "3mo ago")
  // Context: https://qawolfhq.slack.com/archives/C02K01LSEAE/p1660862225915889
  
  // helper
  const url = buildUrl(
    "/recording/qa-wolf--be0267fe-c058-4fea-b8cd-89bbc4ef7780"
  );
  
  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to recording url
  await page.goto(url);
  await page.waitForTimeout(3000);
  
  // assert recording loaded
  const recordingName = page.locator("text=QA Wolf");
  await expect(recordingName).toBeVisible({ timeout: 30 * 1000 });
  
  // try to add collaborator
  await page.click("text=ios_shareShare");
  
  // assert share modal opened
  await assertElement(page, ".sharing-modal");
  
  // assert collaborator UI is hidden
  const emailInput = page.locator('[placeholder="Email address"]');
  const collaboratorText = page.locator("text=Collaborator");
  await expect(emailInput).toHaveCount(0);
  await expect(collaboratorText).toHaveCount(0);
  await page.mouse.click(0, 0);
  
  await logOut(page);
  

  process.exit();
})();