const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // recording belongs to userId 6
  // https://app.replay.io/recording/private-recording-test--149e2344-f94b-4095-a760-d9c67d5b4277
  
  // helper
  const url = buildUrl("/recording/private-recording-test--149e2344-f94b-4095-a760-d9c67d5b4277");
  
  // open a team replay
  // let { browser, context, page } = await logIn({ userId: 1 });
  let { browser, context, page } = await logIn({ userId: 7 });
  await page.goto(url); // bug is here - Unexpected session error
  
  // check the team member can access it
  await expect(page.locator(`:text('Private Recording Test')`).first()).toBeVisible({timeout: 60 * 1000});
  await page.close();
  
  // go to the replay with a non-team member user
  let { page } = await logIn({ userId: 3 });
  await page.goto(url);
  
  // check the non-team member cannot access it
  await assertText(page, "Sorry, you don't have permission!");
  await assertText(page, "Request access");

  process.exit();
})();