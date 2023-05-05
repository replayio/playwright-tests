const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Twitter: Navigate through site";

  const {
    assertNotElement,
    assertNotText,
    buildUrl,
    deleteTeam,
    getBoundingClientRect,
    getPlaybarTooltipValue,
    launchReplay,
    uploadReplay,
    logIn,
    logoutSequence,
    logOut,
    logInToPinterest,
    logInToLinkedin,
    logInToFacebook,
    parseInviteUrl,
    setFocus,
    waitForFrameNavigated,
    logInToAsana,
    deleteAllSuperblocks,
    logInToAirtable,
    getBoundingBox,
    addElementToCanvas,
    logInToSurveymonkey,
    logInToEtsy,
    createSurveyFromScratch,
    cleanSurveys,
    openPopup,
    deleteSurvey,
    selectAllDelete,
    deleteIdeaPin,
    deleteEvenFlows,
    deletePin,
    deleteSurvey2,
    bubbleLogin,
    extractAppAndPageFromUrl,
    navigateTo,
    superblocksLogin,
    dragAndDrogPdf,
    downloadS3File,
    builderLogin,
    twitterLogin,
    editTwitterProfile,
    slackLogin,
    resetSlackProfile,
    bubbleUrl,
    extractAppAndPageFromUrl,
    addEventAddAction,
  } = shared;
  
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  
  // Navigate to https://twitter.com/i/flow/login
  await page.goto("https://twitter.com/i/flow/login");
  
  // REQ Log into Twitter
  // Fill the 'Phone, email, or username' input with TWITTER_EMAIL
  await page.fill(
    '[autocomplete="username"][name="text"]',
    process.env.TWITTER_EMAIL
  );
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
  
  // REQ Navigate thru Twitter home
  // Click the 'Home' button
  await page.click('[data-testid="AppTabBar_Home_Link"]');
  
  // Assert Able to see users tweet form, tweets and profiles
  await expect(
    page.locator('[data-testid="SideNav_NewTweet_Button"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid*="tweetTextarea_"][aria-label="Tweet text"]')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid="Tweet-User-Avatar"] >> nth=0')
  ).toBeVisible();
  
  // REQ Navigate to a Twitter user profile
  // Click on a Twitter Profile
  await page.click('[data-testid="Tweet-User-Avatar"] >> nth=0');
  
  // Assert Redirected to user profile with Tweets, Replies, Media and Likes present
  await expect(
    page.locator('[data-testid="ScrollSnap-List"] :text("Tweets")')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid="ScrollSnap-List"] :text("Replies")')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid="ScrollSnap-List"] :text("Media")')
  ).toBeVisible();
  await expect(
    page.locator('[data-testid="ScrollSnap-List"] :text("Likes")')
  ).toBeVisible();
  
  // REQ Navigate through Twitters Explore
  // Click the 'Explore' button
  // Assert Explore page and tabs work correctly
  await page.click('[data-testid="AppTabBar_Explore_Link"]');
  
  // Click on 'For you'
  await page.click('[data-testid="ScrollSnap-List"] :text("For you")');
  await expect(page.locator('[data-testid="trend"] >> nth=0')).toBeVisible();
  
  // Click on 'Trending'
  await page.click('[data-testid="ScrollSnap-List"] :text("Trending")');
  await expect(
    page.locator('[data-testid="cellInnerDiv"] :text("United States trends")')
  ).toBeVisible();
  
  // Click on 'News'
  await page.click('[data-testid="ScrollSnap-List"] :text("News")');
  await expect(
    page.locator(
      '[data-testid="trend"] :text("Trending in Business and finance") >> nth=0'
    )
  ).toBeVisible();
  
  // Click on 'Sports'
  await page.click('[data-testid="ScrollSnap-List"] :text("Sports")');
  await expect(
    page.locator('[data-testid="trend"] :text("Trending in Sports") >> nth=0')
  ).toBeVisible();
  
  // Click on 'Entertainment'
  await page.click('[data-testid="ScrollSnap-List"] :text("Entertainment")');
  await expect(
    page.locator('[data-testid="trend"] :text("Trending in Music") >> nth=0')
  ).toBeVisible();
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  

  process.exit();
})();