const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // declare url
  const url = buildUrl("/recording/149e2344-f94b-4095-a760-d9c67d5b4277");
  
  // log in with authorized user
  let { browser, context, page } = await logIn({ userId: 7 });
  await page.goto(url);
  
  // check invited user can access it
  try {
    await assertText(page, "Private Recording Test", { timeout: 5 * 1000 });
  } catch (e) {
    await page.reload();
    await assertText(page, "Private Recording Test");
  }
  await context.close();
  
  // go to the replay with an uninvited user
  ({ page, context } = await logIn({ userId: 1 }));
  await page.goto(url);
  
  // check the uninvited user cannot access it
  try{ // the language here changes occasionally
    await expect(page.locator(`text=Sorry, you don't have permission!`)).toBeVisible();
    await expect(page.locator("button")).toHaveText("Request access");
  } catch{
    await expect(page.locator(`text=Almost there!`)).toBeVisible();
    await expect(page.locator("button")).toHaveText("Sign in to Replay");
  }
  await context.close();

  process.exit();
})();