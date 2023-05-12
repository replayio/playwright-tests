const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

Object.entries(shared).forEach(([k,v]) => globalThis[k] = v);

(async () => {
  shared.TEST_NAME = "Asana: Add & Remove Dashboard Chart";

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
  
  // handle trial modal if present
  try {
    await expect(page.locator("text=Your trial ends in")).not.toBeVisible({
      timeout: 5000,
    });
  } catch {
    await page.click(':text("Skip for now")');
  }
  
  // nav to first test project -> dashboard
  await page.click(':text("First Test Project")');
  await page.click('a:has-text("Dashboard")');
  await expect(page.locator(':text("Add chart")')).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // clean test if needed
  while (await page.locator("text=QA Chart").count()) {
    await page.hover(`:text('QA Chart')`);
    await page.waitForTimeout(1000);
    await page.click(
      `[class*="ThemeableCardPresentation"]:has-text("QA Chart") div[aria-label="More actions"].SubtleIconButton >> nth = 0`
    );
    await page.click(':text("Remove chart")');
    await expect(
      page.locator("text=Are you sure you want to remove this chart?")
    ).toBeVisible();
    await page.click(".DangerButton");
    await page.waitForTimeout(1000);
  }
  
  // add dashboard chart
  const chartName = `QA Chart ` + Date.now().toString().slice(-4);
  await page.click(':text("Add chart")');
  await page.fill('[placeholder="Total tasks by completion status"]', chartName);
  await page.click(".ChartDialogFooter .PrimaryButton");
  
  // assert chart
  await expect(page.locator(`text=${chartName}`)).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // delete chart
  await page.hover(`:text('${chartName}')`);
  await page.waitForTimeout(1000);
  await page.click(
    `[class*="ThemeableCardPresentation"]:has-text("${chartName}") div[aria-label="More actions"].SubtleIconButton >> nth = 0`,
    {
      delay: 500,
    }
  );
  await page.click(':text("Remove chart")');
  await expect(
    page.locator("text=Are you sure you want to remove this chart?")
  ).toBeVisible();
  await page.click(".DangerButton");
  
  // assert chart deleted
  await expect(page.locator(`text=${chartName}`)).not.toBeVisible({
    timeout: 60 * 1000,
  });
  
  // upload replay
  await uploadReplay(page);
  
  shared.page = page;
  shared.chartName = chartName;
  

  process.exit();
})();