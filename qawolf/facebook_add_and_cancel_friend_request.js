const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  const { page } = await logInToFacebook(
    'qawreplayuser@gmail.com',
    'Replayfb-qaw1'
  );
  
  // view user profile
  await page.goto("https://www.facebook.com/jeff.gorell");
  await assertText(page, "Jeff Gorell");
  
  // ensure friend not added
  const cancelRequestButton = await page.$('[aria-label="Cancel request"]');
  if (cancelRequestButton) await cancelRequestButton.click();
  
  // add friend
  await page.click('[aria-label="Add Friend"]');
  await assertText(page, "Cancel request");
  
  // cancel friend request
  await page.click('[aria-label="Cancel request"]');
  await assertText(page, "Add Friend");
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();