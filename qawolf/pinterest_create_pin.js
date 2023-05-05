const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  const TEST_NAME = "Pinterest: Create Pin";

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
  
  // launch replay
  const { browser, context } = await launchReplay({ slowMo: 2000 });
  
  // login to pinterest
  const { page } = await logInToPinterest(context, {
    email: "replay+pinaccount@qawolf.email",
  });
  
  // click on create pin
  await page.click(':text-is("Create")');
  await page.click(':text-is("Create Pin")');
  await expect(page.locator(':text("Drag and drop")')).toBeVisible();
  
  // upload pin and create
  page.once("filechooser", (chooser) =>
    chooser.setFiles("/root/files/large.jpg")
  );
  await page.click(':text("Drag and drop")', { force: true });
  await page.waitForTimeout(5000);
  
  // fill out pin creation form and submit
  const title = `${faker.name.findName()} ${Date.now().toString().slice(-4)}`;
  const description = faker.lorem.sentence();
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Add your title"]',
    title
  );
  await page.fill(
    '[data-test-id="editor-with-mentions"] [aria-label="Tell everyone what your Pin is about"]',
    description
  );
  await page.waitForTimeout(5000);
  
  // add alt text
  await page.click(':text("Add alt text")');
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Explain what people can see in the Pin"]',
    faker.lorem.sentence()
  );
  
  // repeat steps
  await page.reload();
  page.once("filechooser", (chooser) =>
    chooser.setFiles("/root/files/large.jpg")
  );
  await page.click(':text("Drag and drop")', { force: true });
  await page.waitForTimeout(5000);
  
  // fill out pin creation form and submit
  const title = `${faker.name.findName()} ${Date.now().toString().slice(-4)}`;
  const description = faker.lorem.sentence();
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Add your title"]',
    title
  );
  await page.fill(
    '[data-test-id="editor-with-mentions"] [aria-label="Tell everyone what your Pin is about"]',
    description
  );
  await page.waitForTimeout(5000);
  
  // add alt text
  await page.click(':text("Add alt text")');
  await page.fill(
    '[data-test-id="pin-builder-draft"] [placeholder="Explain what people can see in the Pin"]',
    faker.lorem.sentence()
  );
  
  // save
  await page.click(':text-is("Save")');
  
  // if we run into a modal close out
  try {
    await page.click('[aria-label="Close"]');
  } catch {}
  
  // navigate to profile and Test folder
  await page.click(
    '[data-test-id="button-container"] [aria-label="Accounts and more options"]'
  );
  await page.click('[data-test-id="HeaderAccountsOptionsMenuAccountRep"]');
  await page.click(':text-is("All Pins")');
  await page.waitForTimeout(5000);
  
  // assert pin appears on profile page with correct details
  await expect(page.locator(`:text("${title}")`)).toBeVisible();
  
  // delete pin
  await deletePin(page, title);
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.title = title;
  shared.description = description;
  shared.title = title;
  shared.description = description;
  

  process.exit();
})();