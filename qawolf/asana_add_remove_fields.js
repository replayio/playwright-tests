const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Asana: Add & Remove Fields";

  const { assertNotElement, assertNotText, buildUrl, deleteTeam, getBoundingClientRect, getPlaybarTooltipValue, launchReplay, uploadReplay, logIn, logoutSequence, logOut, logInToPinterest, logInToLinkedin, logInToFacebook, parseInviteUrl, setFocus, waitForFrameNavigated, logInToAsana, deleteAllSuperblocks, logInToAirtable, getBoundingBox, addElementToCanvas, logInToSurveymonkey, logInToEtsy, createSurveyFromScratch, cleanSurveys, openPopup, deleteSurvey, selectAllDelete, deleteIdeaPin, deleteEvenFlows, deletePin, deleteSurvey2, bubbleLogin, navigateTo, superblocksLogin, dragAndDrogPdf, downloadS3File, builderLogin, twitterLogin, editTwitterProfile, slackLogin, resetSlackProfile, bubbleUrl, addEventAddAction } = shared;
  
  // nav to asana landing page
  const { context, browser } = await launchReplay({ slowMo: 1000 });
  const page = await context.newPage();
  await page.goto("https://app.asana.com/-/login");
  
  
  // login
  await page.fill(".LoginEmailForm-emailInput", process.env.ASANA_EMAIL3);
  await page.click(".LoginEmailForm-continueButton");
  await page.fill('[type="password"]', process.env.ASANA_PASSWORD);
  let after = new Date();
  await page.click(".LoginPasswordForm-loginButton");
  
  try {
    // assert dashboard
    await expect(page.locator(':text("Good evening, QA"), :text("Good afternoon, QA"), :text("Good morning, QA")')).toBeVisible();
  } catch {
    // if can't log in, need to go to log in link from email
    const { waitForMessage } = getInbox({ id: "asana3" });
    const { urls } = await waitForMessage({ after });
    console.log(urls[1]); // log in link
  
    await page.goto(urls[1]);
    await page.click(".LoginConfirmView-logInButton"); // click Log in
    await expect(page.locator(':text("Good evening, QA"), :text("Good afternoon, QA"), :text("Good morning, QA")')).toBeVisible();
  }
  
  
  // nav to first test project
  await page.click(':text("First Test Project")');
  await expect(page.locator('[aria-label="Add field"]')).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // clean test
  await page.waitForTimeout(5000);
  while (await page.locator("text=QA Field").count()) {
    let text = await page.innerText(':text("QA Field")');
    console.log(text);
    await page.waitForTimeout(500);
    try {
      await page.click(
        `[role="button"][aria-label="Show options for ${text} column"]`
      );
    } catch {}
    await page.click(
      `[role="button"][aria-label="Show options for ${text} column"]`
    );
    await page.click(':text("Remove field from project")');
    await page.click(':text("Delete field")');
    await page.waitForTimeout(500);
  }
  
  // add field
  const fieldName = `QA Field ` + Date.now().toString().slice(-4);
  await page.click('[aria-label="Add field"]');
  await page.click(':text("Single-select")');
  try {
    await page.click(':text("Text")');
  } catch {
    await page.click(':text("Single-select")');
    await page.click(':text("Text")');
  }
  await page.fill('[placeholder="Phone Number, Address…"]', fieldName);
  await page.click(':text("Create Field")');
  
  // assert field
  await expect(page.locator(`text=${fieldName}`).first()).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // delete field
  await page.click(`[aria-label="Show options for ${fieldName} column"]`);
  await page.click(':text("Remove field from project")');
  await page.click(':text("Delete field")');
  await page.waitForTimeout(2000);
  
  // assert field deleted
  await expect(page.locator(`text=${fieldName}`)).not.toBeVisible({
    timeout: 60 * 1000,
  });
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.fieldName = fieldName;
  

  process.exit();
})();