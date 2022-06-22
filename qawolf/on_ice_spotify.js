const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://open.spotify.com/genre/shows_with_music-page');
  
  // assert page loaded
  await assertText(page, "Spotify");
  
  // log in
  await page.click('[data-testid="login-button"]');
  
  // assert on log in page
  await assertText(page, "To continue, log in to Spotify.");
  
  // log in with Facebook
  await page.click('[data-testid="facebook-login"]');
  await page.fill('[aria-label="Email or phone number"]', process.env.FACEBOOK_EMAIL_3.toString());
  await page.fill('[aria-label="Password"]', process.env.FACEBOOK_PASSWORD_3.toString());
  
  // submit form
  await page.click('[name="login"]');
  
  // assert logged in
  await assertText(page, 'User is not allowed to see the application');

  process.exit();
})();