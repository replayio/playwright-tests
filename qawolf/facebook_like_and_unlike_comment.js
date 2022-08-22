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
  
  //ensure first post is there
  try {
    await assertText(page, "first post", { timeout: 7000 });
  } catch {
    await page.click(':text("Write something to Elizabeth...")');
    await page.keyboard.type("first post");
    await page.click('[aria-label="Post"]');
    await page.waitForTimeout(7000);
    await page.click('[aria-label="Write a comment"]');
    await page.keyboard.type("This is my first comment");
    await page.keyboard.press("Enter");
    await page.waitForTimeout(7000);
  }
  
  // ensure comment not liked
  const unlikeButton = await page.$('[aria-label="Remove Like"]');
  if (unlikeButton) unlikeButton.click();
  
  // like comment
  await page.locator(':text("Like"):below(:text("This is my first comment"))').click();
  await assertElement(page, '[aria-label="1 reaction; see who reacted to this"]');
  
  // unlike comment
  await page.click('[aria-label="Remove Like"]');
  await page.waitForTimeout(1000);
  await assertNotElement(
    page,
    '[aria-label="1 reaction; see who reacted to this"]'
  );
  

  process.exit();
})();