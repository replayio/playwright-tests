const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // BUG REPORTED 4/4/2022 
  // https://qawolfhq.slack.com/archives/C02GEJCC9JP/p1649031414020109
  
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.click('[title="Test Permissions"]');
  
  // open replay
  await page.click('text=Time Travel');
  await page.click("text=ViewerDevTools");
  
  // hide video
  const video = page.locator("#video");
  await expect(video).toBeVisible();
  await page.click(':text("videocam_off")');
  await expect(video).toBeHidden();
  
  // unhide video
  await page.click('[title="Show Video"]');
  await expect(video).toBeVisible();
  
  // unhide edior
  const editor = page.locator(".editor-mount");
  await expect(editor).toBeHidden();
  //await page.click(':text("description")');
  await page.click(':text("demo")');
  await page.click(':text("demo-script.js")');
  await expect(editor).toBeVisible();
  
  // hide editor
  await page.click('[title="Close tab"]');
  await expect(editor).toBeHidden();

  process.exit();
})();