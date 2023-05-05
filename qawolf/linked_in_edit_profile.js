const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "LinkedIn: Edit profile";

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
  // const { context, browser } = await launch();
  const page = await context.newPage();
  
  // REQ 01 Log into LinkedIn
  const { page } = await logInToLinkedin(context);
  
  // Assert able to log into linkedIn
  await expect(page.locator(':text("Start a post")')).toBeVisible();
  
  // REQ 02 View LinkedIn profile
  // Click the profile icon button
  try {
    await page.click('[alt="QA Wolf Test User"]');
  } catch {
    await page.click('[alt="New QA Wolf Test User"]');
  }
  
  // Click the 'View Profile' button
  await page.click('.full-width:text("View Profile")');
  
  // Assert Redirected to profile page
  expect(page).toHaveURL(/.*qa-wolf-test-user/);
  
  // make sure Linkedin intro is cleaned up to the og constants
  // constants for original intro (revert back)
  const ogFirstName = "QA";
  const ogLastName = "Wolf Test User";
  const ogHeadline = "Software Engineer at Fake, Inc";
  const ogPostalCode = "32240";
  const ogCity = "Jacksonville Beach, Florida";
  
  try {
    await expect(page.locator('h1:text-is("QA Wolf Test User")')).toBeVisible();
  } catch {
    await page.click('[aria-label="Edit intro"]');
  
    // Fill First Name with OG value
    await page.fill('[data-test-form-element=""] input >> nth=0', ogFirstName);
  
    // Fill Last Name with OG value
    await page.fill('[data-test-form-element=""] input >> nth=1', ogLastName);
  
    // Fill Headline with OG value
    await page.fill('[data-test-form-element=""] input >> nth=3', ogHeadline);
  
    // Fill Postal Code with OG value
    await page.fill('[data-test-form-element=""] input >> nth=7', ogPostalCode);
  
    await page.click('[data-test-modal=""] :text("Save")');
    await page.waitForTimeout(1000);
  
    try {
      await page.click('[data-test-modal-close-btn=""]'); // close modal
    } catch {}
  
    await expect(page.locator('h1:has-text("QA Wolf Test User")')).toBeVisible();
  }
  
  // Assert User information loads correctly
  // - Name
  await expect(page.locator('h1:has-text("QA Wolf Test User")')).toBeVisible();
  // - Address
  await expect(
    page.locator("text=Jacksonville Beach, Florida, United States ")
  ).toBeVisible();
  // - Title
  // - Company
  await expect(
    page.locator(
      'div:has-text("Software Engineer at Fake, inc"):below(h1:has-text("QA Wolf Test User")) >> nth=0'
    )
  ).toBeVisible();
  // - Experience
  await expect(page.locator('span:text-is("Experience") >> nth=0')).toBeVisible();
  // - Interests
  await expect(page.locator('span:text-is("Interests") >> nth=0')).toBeVisible();
  
  // REQ 03 Edit Linkedin Intro
  // constants for new intro
  const newfirstName = "New QA";
  const newLastName = "Wolf Test User";
  const newHeadline = "Professional Foodie at Instagram, Inc";
  const newPostalCode = "77095";
  const newCity = "Houston, Texas";
  
  // Click the pencil icon
  await page.click('[aria-label="Edit intro"]');
  
  // Fill First Name with new value
  await page.fill('[data-test-form-element=""] input >> nth=0', newfirstName);
  
  // Fill Last Name with new value
  await page.fill('[data-test-form-element=""] input >> nth=1', newLastName);
  
  // Fill Headline with new value
  await page.fill('[data-test-form-element=""] input >> nth=3', newHeadline);
  
  // Fill Postal Code with new value
  await page.fill('[data-test-form-element=""] input >> nth=7', newPostalCode);
  
  // FIll City with new value
  await expect(
    page.locator(
      '[data-test-location-form-component=""] [data-test-text-entity-list-form-select=""]'
    )
  ).toHaveValue("Houston, Texas");
  
  // Assert Edit modal displays correctly
  await expect(
    page.locator('[data-test-modal-container=""] #profile-edit-form-page-header')
  ).toHaveText("Edit intro");
  
  // Click the 'Save' button
  await page.click('[data-test-modal=""] :text("Save")');
  await page.waitForTimeout(1000);
  
  // Assert Able to save values and see changes on profile page
  try {
    await page.click('[data-test-modal-close-btn=""]'); // close modal
  } catch {}
  await expect(
    page.locator('h1:has-text("New QA Wolf Test User")')
  ).toBeVisible();
  await expect(page.locator("text=Houston, Texas, United States ")).toBeVisible();
  await expect(
    page.locator(
      'div:has-text("Professional FOodie at Instagram, inc"):below(h1:has-text("QA Wolf Test User")) >> nth=0'
    )
  ).toBeVisible();
  
  // Navigate to Edit Intro modal
  await page.click('[aria-label="Edit intro"]');
  
  // REQ 04 Edit LinkedIn contact info
  // Click on 'Edit contact info'
  await page.click(
    '[data-test-navigation-button__link=""]:has-text("Edit contact info")'
  );
  
  // Fill Phone number with new value
  const phone = faker.phone.phoneNumber("### ### ####");
  await page.fill(
    '[data-test-single-line-text-form-component=""] #single-line-text-form-component-urn-li-fsu-profileContactInfoEditFormElement-PHONE-NUMBER-1',
    phone
  );
  
  // Select different phone type
  if (
    (await page.inputValue(
      '[data-test-form-element-group-elements=""] [data-test-text-entity-list-form-select=""]'
    )) === "Home"
  ) {
    await page.selectOption(
      "select#text-entity-list-form-component-urn-li-fsu-profileContactInfoEditFormElement-PHONE-TYPE-1",
      "Work"
    );
  } else if (
    (await page.inputValue(
      '[data-test-form-element-group-elements=""] [data-test-text-entity-list-form-select=""]'
    )) === "Work"
  ) {
    await page.selectOption(
      "select#text-entity-list-form-component-urn-li-fsu-profileContactInfoEditFormElement-PHONE-TYPE-1",
      "Mobile"
    );
  } else if (
    (await page.inputValue(
      '[data-test-form-element-group-elements=""] [data-test-text-entity-list-form-select=""]'
    )) === "Mobile"
  ) {
    await page.selectOption(
      "select#text-entity-list-form-component-urn-li-fsu-profileContactInfoEditFormElement-PHONE-TYPE-1",
      "Home"
    );
  } else {
    await page.selectOption(
      "select#text-entity-list-form-component-urn-li-fsu-profileContactInfoEditFormElement-PHONE-TYPE-1",
      "Home"
    );
  }
  
  // Fill Address with new value
  const address = faker.random.words(3);
  await page.fill(
    '[data-test-multiline-text-form-component=""] #multiline-text-form-component-urn-li-fsu-profileContactInfoEditFormElement-ADDRESS-1',
    address
  );
  
  // Select different Birthday
  // month
  if ((await page.inputValue('[data-test-month-select=""]')) === "1") {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown",
      "2"
    );
  } else if ((await page.inputValue('[data-test-month-select=""]')) === "2") {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown",
      "3"
    );
  } else if ((await page.inputValue('[data-test-month-select=""]')) === "3") {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown",
      "1"
    );
  } else {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown",
      "1"
    );
  }
  
  // day
  if ((await page.inputValue('[data-test-day-select=""]')) === "3") {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown-day-select",
      "4"
    );
  } else if ((await page.inputValue('[data-test-day-select=""]')) === "4") {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown-day-select",
      "5"
    );
  } else if ((await page.inputValue('[data-test-day-select=""]')) === "5") {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown-day-select",
      "3"
    );
  } else {
    await page.selectOption(
      "select#-urn-li-fsu-profileContactInfoEditFormElement-BIRTH-DATE-1-date-dropdown-day-select",
      "3"
    );
  }
  
  // Click the 'Save' button
  await page.click('[data-test-modal=""] :text("Save")');
  
  // Assert Save was successful message
  await expect(
    page.locator('[data-test-artdeco-toast-item-type="success"]')
  ).toBeVisible();
  
  // Assert Information is saved
  await page.click('[data-test-modal=""] :text("Save")');
  try {
    await page.click('[data-test-modal-close-btn=""]'); // close modal
  } catch {}
  
  await page.click("#top-card-text-details-contact-info");
  await expect(page.locator(`text=${phone}`)).toBeVisible();
  await expect(page.locator(`text=${address}`)).toBeVisible();
  await page.click('[data-test-modal-close-btn=""]'); // close Contact info modal
  
  // clean up - revert Linkedin Intro
  await page.click('[aria-label="Edit intro"]');
  
  // Fill First Name with OG value
  await page.fill('[data-test-form-element=""] input >> nth=0', ogFirstName);
  
  // Fill Last Name with OG value
  await page.fill('[data-test-form-element=""] input >> nth=1', ogLastName);
  
  // Fill Headline with OG value
  await page.fill('[data-test-form-element=""] input >> nth=3', ogHeadline);
  
  // Fill Postal Code with OG value
  await page.fill('[data-test-form-element=""] input >> nth=7', ogPostalCode);
  
  await page.click('[data-test-modal=""] :text("Save")');
  await page.waitForTimeout(1000);
  try {
    await page.click('[data-test-modal-close-btn=""]'); // close modal
  } catch {}
  
  await expect(page.locator('h1:text-is("QA Wolf Test User")')).toBeVisible();
  
  // list and upload the replay
  await uploadReplay(page);
  
  shared.browser = browser;
  shared.context = context;
  shared.page = page;
  shared.page = page;
  shared.ogFirstName = ogFirstName;
  shared.ogLastName = ogLastName;
  shared.ogHeadline = ogHeadline;
  shared.ogPostalCode = ogPostalCode;
  shared.ogCity = ogCity;
  shared.newfirstName = newfirstName;
  shared.newLastName = newLastName;
  shared.newHeadline = newHeadline;
  shared.newPostalCode = newPostalCode;
  shared.newCity = newCity;
  shared.phone = phone;
  shared.address = address;
  

  process.exit();
})();