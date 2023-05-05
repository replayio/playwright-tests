const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Pinterest: Email Pin";

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
  
  // Call loginReplay helper
  // for these tests (and any example tests) please use the page and context created by loginReplay()
  const { browser, context } = await launchReplay();
  
  // log in to pinterest
  // log in with Replay+pin-one@qawolf.email and default password
  const { page } = await logInToPinterest(context);
  await page.waitForTimeout(5000);
  
  // click Today
  await page.click('[data-test-id="header-background"] :text("Today")');
  await page.waitForTimeout(5000);
  await expect(
    page.locator('[data-test-id="today-tab-header"] h2')
  ).toBeVisible();
  
  // click Notifications
  await page.click(
    '[data-test-id="button-container"] [aria-label="Notifications"]'
  );
  await page.waitForTimeout(5000);
  await expect(page.locator('[data-test-id="scrollable-list"]')).toBeVisible();
  await expect(page.locator("text=Updates")).toBeVisible();
  
  // click Account dropdown
  await page.click(
    '[data-test-id="header-accounts-options-button"] [aria-label="Accounts and more options"]'
  );
  await page.waitForTimeout(5000);
  await expect(
    page.locator(
      '[data-test-id="header-menu-options-settings"] :text("Settings")'
    )
  ).toBeVisible();
  
  // go to Settings -> add new About section
  await page.click(
    '[data-test-id="header-menu-options-settings"] :text("Settings")'
  );
  await page.waitForTimeout(5000);
  const description = faker.random.words(6);
  await page.fill('[data-test-id="edit-profile-form"] #about', description);
  await page.click('[data-test-id="done-button"] :text("Save")');
  await expect(page.locator("text=Profile Saved")).toBeVisible();
  
  // click Messages
  await page.click('[data-test-id="button-container"] [aria-label="Messages"]');
  await page.waitForTimeout(5000);
  await expect(page.locator("text=Inbox")).toBeVisible();
  
  // click Home
  await page.click('[data-test-id="header-background"] :text("Home")');
  await page.waitForTimeout(5000);
  
  // hover a pin
  await page.hover('[data-test-id="pinWrapper"] a');
  await page.waitForTimeout(5000);
  
  // click share icon
  await page.click('[data-test-id="share-icon-button"] [aria-label="Send"]');
  await page.waitForTimeout(5000);
  
  // click email button
  await page.click('[aria-label="Share on Email"]');
  await page.waitForTimeout(5000);
  
  // REQ Pinterest: Email Pin (Example)
  // fill and submit email share form
  await page.fill(
    '#email[placeholder="Enter email address"]',
    "replay+pininterest@qawolf.email"
  );
  await page.waitForTimeout(5000);
  await page.fill(
    '#sendObjectMessage[placeholder="Add a message"]',
    "Sending you a cute pinterest pic"
  );
  await page.waitForTimeout(5000);
  
  // let after = new Date();
  await page.click(':text-is("Send")');
  
  // Assert share email recieved
  // const { waitForMessage } = getInbox({ id: "pininterest" });
  // const { subject, urls } = await waitForMessage({ after });
  // expect(subject).toBe("____");
  
  // Assert error pop up notification
  await expect(page.locator('[data-test-id="toast"]')).toHaveText(
    "Failed to create conversation."
  );
  await page.waitForTimeout(5000);
  await page.mouse.click(0, 0);
  
  // try sharing another pin via email
  // hover a pin
  await page.hover('[data-test-id="pinWrapper"] a >> nth=3');
  await page.waitForTimeout(5000);
  
  // click share icon
  await page.click('[data-test-id="share-icon-button"] [aria-label="Send"]');
  await page.waitForTimeout(5000);
  
  // click email button
  await page.click('[aria-label="Share on Email"]');
  await page.waitForTimeout(5000);
  
  // REQ Pinterest: Email Pin (Example)
  // fill and submit email share form
  await page.fill(
    '#email[placeholder="Enter email address"]',
    "replay+pininterest@qawolf.email"
  );
  await page.waitForTimeout(5000);
  await page.fill(
    '#sendObjectMessage[placeholder="Add a message"]',
    "Sending you a cute pinterest pic"
  );
  await page.waitForTimeout(5000);
  
  // let after = new Date();
  await page.click(':text-is("Send")');
  
  // Assert error pop up notification
  await expect(page.locator('[data-test-id="toast"]')).toHaveText(
    "Failed to create conversation."
  );
  await page.waitForTimeout(5000);
  
  // Call uploadReplay helper
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.description = description;
  

  process.exit();
})();