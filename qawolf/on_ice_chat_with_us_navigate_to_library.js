const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  //  log in and go to recording
  const { context, page } = await logIn({ userId: 2 });
  await page.goto(buildUrl('/recording/e64e05d0-7e55-4165-aa03-0e026335785a'));
  
  // CI:PR
  
  // Test is disabled until we can get an alternate way to log in
  // API log in causes CORS error for chat
  
  // asssert viewing replay
  await assertText(page, "Viewer", { timeout: 45 * 1000 });
  
  // remove auth header to prevent CORS error*************************
  // have to reload to make CORS clear error which puts us in a logged out state
  // have to be logged in to access chat
  // await context.setExtraHTTPHeaders({});
  // await page.setExtraHTTPHeaders({});
  // await page.reload();
  // // *****************************************************************
  
  // open chat with us
  await page.click(".expand-dropdown");
  await page.click("text=Chat with us");
  
  // grab frame
  var chatApp = await(await page.waitForSelector("[title='Intercom live chat messenger']")).contentFrame();
  
  // assert chat with us
  await assertText(chatApp, "Nothing to see here yet");
  await assertText(chatApp, "No messages from the team");
  
  // close chat with us
  await chatApp.click('[aria-label="Close"]');
  
  // nagivate to library
  await page.click("button");
  
  // assert viewing library
  await assertText(page, "Your Library");
  await assertText(page, "Launch Replay");

  process.exit();
})();