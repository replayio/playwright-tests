const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(process.env.FACEBOOK_EMAIL_2, process.env.FACEBOOK_PASSWORD_2);
  
  // view user profile
  await page.goto("https://www.facebook.com/profile.php?id=100074229491087");
  await assertText(page, "Mike Algdbbidiajhg Martinazzison");
  
  // ensure friend not added
  const cancelRequestButton = await page.$('[aria-label="Cancel Request"]');
  if (cancelRequestButton) cancelRequestButton.click();
  
  // add friend
  await page.click('[aria-label="Add Friend"]');
  await assertText(page, "Cancel Request");
  
  // cancel friend request
  await page.click('[aria-label="Cancel Request"]');
  await assertText(page, "Add Friend");

  process.exit();
})();