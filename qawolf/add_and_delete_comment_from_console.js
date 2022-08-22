const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7, options: { slowMo: 1000 } });
  await assertText(page, "Your Library");
  
  // go to replay
  await page.goto(
    buildUrl("/recording/test-commenter-1--0c99a6af-6f63-4d26-aa77-7e3e959087dc")
  );
  
  // assert replay loaded
  await assertText(page, "Test commenter 1");
  await assertText(page, "DevTools");
  
  // ensure comments deleted
  const comments = page.locator("text=comments");
  if ((await comments.count()) < 1) {
    await page.click("text=forum");
  }
  
  // const startConvo = page.locator("text=Start a conversation");
  const startConvo = page.locator(
    ":text('Add a comment to the video, a line of code, or a console message.')"
  );
  while ((await startConvo.count()) < 1) {
    await page.click("text=more_vert");
    await page.click("text=Delete comment and replies");
    await page.click('[role="dialog"] button >> text=Delete comment');
    await page.waitForTimeout(2000);
  }
  await expect(startConvo).toBeVisible();
  
  // open DevTools
  await page.click("text=ViewerDevTools");
  
  // hide video to expose all of console
  await page.click("text=videocam_off");
  
  // enter comment from console
  await page.hover('[data-link-actor-id="clocktower"]');
  await page.hover('.log:has-text("clocktower") >> nth=0 >> .button');
  try {
    await page.click(".log:has-text('clocktower') >> nth=0 >> .img", {
      timeout: 5000,
    });
  } catch {}
  await page.click("text=add_comment");
  await page.keyboard.type("Here is my comment");
  await page.keyboard.press("Enter");
  
  // assert comment created
  await assertText(page, "log(image);\nkeyboard_arrow_right");
  await assertText(page, "QA Wolf");
  await assertText(page, "Here is my comment");
  
  // delete comment
  await page.click("text=more_vert");
  await page.click("text=Delete comment and replies");
  await page.click('[role="dialog"] button >> text=Delete comment');
  
  // assert comment deleted
  await expect(startConvo).toBeVisible({ timeout: 60 * 1000 });
  
  await logOut(page);
  

  process.exit();
})();