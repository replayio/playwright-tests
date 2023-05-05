const {
  assert,
  assertElement,
  assertText,
  expect,
  faker,
  getInbox,
  getValue,
  launch,
  launchReplay,
  uploadReplay,
  assertNotElement,
  assertNotText,
  buildUrl,
  deleteTeam,
  getBoundingClientRect,
  getPlaybarTooltipValue,
  logIn,
  logInToFacebook,
  parseInviteUrl,
  setFocus,
  waitForFrameNavigated,
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  
  // Navigate to https://twitter.com/i/flow/login
  await page.goto("https://twitter.com/i/flow/login");
  
  // REQ Log into Twitter
  // Fill the 'Phone, email, or username' input with TWITTER_EMAIL
  await page.fill('[autocomplete="username"][name="text"]', process.env.TWITTER_EMAIL);
  await page.click(':text("Next")');
  
  // If it asks to Enter phone # or username
  try {
    await page.fill('[data-testid="ocfEnterTextTextInput"]', "ReplayQa98928");
    await page.click(':text("Next")');
  } catch {}
  
  // Fill the 'Password' input with TWITTER_PASSWORD
  await page.fill('[name="password"]', process.env.TWITTER_PASSWORD);
  
  // Click the 'Login' button
  await page.click('[data-testid="LoginForm_Login_Button"]');
  await page.waitForTimeout(2000);
  
  // Assert Able to log into Twitter successfully
  await expect(page.locator('[data-testid="AppTabBar_Home_Link"]')).toBeVisible();
  
  // tweet constant
  const tweet = "Bull market!!";
  
  // go to Profile
  await page.click('[data-testid="AppTabBar_Profile_Link"]');
  await page.waitForTimeout(2000);
  
  // clean up - delete tweet
  while (await page.locator('[data-testid="tweetText"] :text("Bull market!!")').count()) {
    await page.click('[data-testid="tweet"] [data-testid="caret"]:right-of(:text("Bull market!!")) >> nth=0'); // click kebab
    await page.click('[data-testid="Dropdown"] :text("Delete")');
    await page.click('[data-testid="confirmationSheetConfirm"]');
    await expect(page.locator('text=Your Tweet was deleted')).toBeVisible();
    await page.waitForTimeout(2000);
  }
  
  // click Home
  await page.click('[data-testid="AppTabBar_Home_Link"]');
  
  // REQ Create tweet
  // Fill the "What's happening?" field with new tweet
  await page.fill('[data-testid="tweetTextarea_0"][aria-label="Tweet text"]', tweet);
  
  // Click the Image icon and upload image
  const [fileChooser] = await Promise.all([
    page.waitForEvent("filechooser"),
  
    // Opens the file chooser.
    await page.click('[data-testid="toolBar"] [aria-label="Add photos or video"]'),
  ]);
  await fileChooser.setFiles("/root/files/avatar.png");
  await page.waitForTimeout(3000);
  
  // Click on 'Add description' below image
  await page.click('[data-testid="altTextWrapper"][aria-label="Add description"]');
  
  // Fill the 'Description' field with new Description
  const description = "wolf vibes";
  await page.fill('[data-testid="altTextInput"]', description);
  
  // Click the 'Save' button
  await page.click('[data-testid="endEditingButton"]');
  await page.waitForTimeout(2000);
  
  // Click the 'Tweet' button
  await page.click('[data-testid="primaryColumn"] [data-testid="tweetButtonInline"]');
  
  
  // Assert After reloading page, we're able to see tweet on Home feed
  // - Image appears correctly
  await expect(page.locator('[aria-label="wolf vibes"][data-testid="tweetPhoto"]')).toBeVisible();
  // - Tweet text appears correctly
  await expect(page.locator('[data-testid="tweetText"] :text("Bull market!!")')).toBeVisible();
  await page.waitForTimeout(4000);
  
  
  // REQ View tweet on profile
  // Click the 'Profile' button
  await page.click('[data-testid="AppTabBar_Profile_Link"]');
  
  // Assert Recently posted tweets appears under 'Tweets'
  await expect(page.locator('[data-testid="tweetText"] :text("Bull market!!")')).toBeVisible();
  await expect(page.locator('[aria-label="wolf vibes"][data-testid="tweetPhoto"]:below(:text("Bull market!!"))')).toBeVisible();
  await page.waitForTimeout(4000);
  
  // REQ Reply to tweet
  // Click on a tweet
  await page.click('[data-testid="tweetText"] :text("Bull market!!")');
  await page.waitForTimeout(2000);
  
  // Fill the 'Tweet your reply' field with new reply
  const reply = "That's cool!";
  await page.fill('[data-testid="tweetTextarea_0"][aria-label="Tweet text"]', reply);
  await page.waitForTimeout(2000);
  
  // Click the 'Reply' button
  await page.click('[data-testid="cellInnerDiv"] [data-testid="tweetButtonInline"]');
  
  // Assert Your Tweet was sent notification
  await expect(page.locator('[data-testid="toast"]')).toBeVisible();
  
  // Assert Tweet appears under replies
  await expect(page.locator(`[data-testid="tweetText"] :text("That's cool!"):below([aria-label="wolf vibes"][data-testid="tweetPhoto"]:below(:text("Bull market!!")))`)).toBeVisible();
  await page.waitForTimeout(3000);
  
  
  // clean up - delete tweet
  await page.click('[data-testid="tweet"] [data-testid="caret"]:right-of(:text("Bull market!!")) >> nth=0'); // click kebab
  await page.click('[data-testid="Dropdown"] :text("Delete")');
  await page.click('[data-testid="confirmationSheetConfirm"]');
  await expect(page.locator('text=Your Tweet was deleted')).toBeVisible();
  await expect(page.locator('[data-testid="tweetText"] :text("Bull market!!")')).not.toBeVisible();
  await page.waitForTimeout(3000);
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();