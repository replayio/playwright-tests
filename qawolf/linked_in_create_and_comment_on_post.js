const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "LinkedIn: Create and Comment on Post";

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
  
  // open replay browser
  const { browser, context } = await launchReplay({ slowMo: 500 });
  
  // login to linkedin
  const { page } = await logInToLinkedin(context);
  
  // Act:
  // Click the "Start a post?" field
  await page.click(
    '[aria-label="Primary Navigation"] [data-test-app-aware-link=""]'
  );
  await page.click(':text("Start a post")');
  
  // Fill the 'What do you want to talk about' field with new post
  const post = faker.lorem.sentence();
  await page.fill(
    '[data-test-modal-container=""] [data-test-ql-editor-contenteditable="true"]',
    post
  );
  
  // Click the Image icon
  page.once("filechooser", (chooser) =>
    chooser.setFiles("/root/files/large.jpg").catch((err) => console.log(err))
  );
  await page.click('[data-test-modal=""] :text("Add a photo")');
  
  // Upload image and click the 'Done' button
  await page.click('[data-test-modal=""] :text("Done")');
  
  // Click the 'Post' button
  await page.click('[data-test-modal=""] .share-actions__primary-action');
  
  // Assert:
  // Post successful message
  // - Post text appears correctly
  // - User information appears correctly
  await expect(
    page.locator(
      '[data-test-artdeco-toast-item-type="success"] :text("Post successful.")'
    )
  ).toBeVisible();
  await expect(page.locator(`:text("${post}")`)).toBeVisible();
  await expect(
    page.locator(
      '[alt="No alternative text description for this image"] >> nth = 0'
    )
  ).toBeVisible();
  
  // Act:
  // Click the 'Profile' button
  await page.click('[alt="QA Wolf Test User"]');
  
  // Click the 'View Profile' button
  await page.click(':text-is("View Profile")');
  
  // Click on 'Show all activiy'
  await page.click("#navigation-index-see-all-recent-activity");
  
  // Assert:
  // Posts appear correctly under User's Activity
  await expect(page.locator(`:text("${post}")`)).toBeVisible();
  await expect(
    page.locator(
      '[alt="No alternative text description for this image"] >> nth = 0'
    )
  ).toBeVisible();
  
  // Act:
  // Click the comment button under created post
  await page.click('[aria-label="Comment on QA Wolf Test User’s post"]');
  
  // Fill the 'Add a comment' field with new comment
  const comment = faker.lorem.sentence();
  await page.fill('[data-test-ql-editor-contenteditable="true"]', comment);
  
  // Click the 'Post' button
  await page.click('[aria-label="Post comment on QA Wolf Test User’s post"]');
  
  // Assert:
  // Comment is created under Post reply
  await expect(
    page.locator(`[class*="comments-comment"] :text("${comment}")`)
  ).toBeVisible();
  
  // upload replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.post = post;
  shared.comment = comment;
  

  process.exit();
})();