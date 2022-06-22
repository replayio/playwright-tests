const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in to Facebook
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_2,
    process.env.FACEBOOK_PASSWORD_2
  );
  
  // view user profile
  await page.goto("https://www.facebook.com/profile.php?id=100073845716617");
  await assertText(page, "Elizabeth Algchdegaffag Sidhuman");
  await page.evaluate(() => {
    window.scrollTo(0, 3000);
  });
  
  //assert post is there
  await assertText(page, "first post");
  
  // ensure comment not liked
  const unlikeButton = await page.$('[aria-label="Remove Like"]');
  if (unlikeButton) unlikeButton.click();
  
  // like comment
  await page.click(':text("Like"):below(:text("This is my first comment"))');
  await assertElement(page, '[aria-label="1 reaction; see who reacted to this"]');
  
  // unlike comment
  await page.click('[aria-label="Remove Like"]');
  await page.waitForTimeout(1000);
  await assertNotElement(page, '[aria-label="1 reaction; see who reacted to this"]');

  process.exit();
})();