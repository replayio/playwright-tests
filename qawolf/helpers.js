const assert = require("assert");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");
require("dotenv").config();

async function launch({ headless, ...rest } = { headless: false }) {
  const playwright = require("playwright");
  let browserName =
    rest.browser || process.env.PLAYWRIGHT_CHROMIUM ? "chromium" : "firefox";

  const browser = await playwright[browserName].launch({
    ...rest,
    headless,
    timeout: 60000,
  });
  const context = await browser.newContext();
  return { browser, context };
}

async function assertNotElement(page, element, options) {
  return page.waitForFunction(
    (element) => {
      return document.querySelector(element);
    },
    element,
    options
  );
}

async function assertNotText(page, text, options) {
  return page.waitForFunction(
    (text) => {
      return document.body.innerText.includes(text);
    },
    text,
    options
  );
}

function buildUrl(route = "/") {
  const baseUrl = (
    process.env.URL ||
    process.env.DEFAULT_URL ||
    "https://staging.app.replay.io/"
  ).replace(/\/$/, "");

  return `${baseUrl}${route}`;
}

async function deleteTeam({ page }) {
  // delete team from settings
  await page.click("text=Delete Team");
  await page.click("button:has-text('Delete this team')");

  // assert confirm modal appears
  await assertText(
    page,
    "Unexpected bad things will happen if you don't read this"
  );

  // delete anyway
  await page.click("button:has-text('Delete team')");
}

function getBoundingClientRect(selector, options) {
  return async (page) => {
    const el = await page.waitForSelector(selector, options);
    return await page.evaluate((e) => e.getBoundingClientRect().toJSON(), el);
  };
}

async function getPlaybarTooltipValue(page) {
  await page.waitForTimeout(2000);
  const playheadLocation = page.locator(
    ".progress-line-paused-edit-mode-inactive"
  );
  await playheadLocation.hover();

  return await page.locator(".timeline-tooltip").innerText();
}

async function runCommand(cmd, { logStdError }) {
  return new Promise((resolve) => {
    const [c, ...args] = cmd.split(" ");
    const proc = require("child_process").spawn(c, args);
    proc.stderr.on("data", (data) => logStdError?.(data.toString("utf-8")));
    proc.on("exit", () => resolve());
  });
}

async function launchReplay(options = {}) {
  // install the replay package
  console.log(
    await runCommand("npm install @replayio/playwright", {
      logStderr: console.error.bind(console),
    })
  );

  const replayPlaywrightPath = require.resolve("@replayio/playwright", {
    paths: ["/root/node_modules/", "./node_modules"],
  });

  if (!replayPlaywrightPath) {
    throw new Error("Unable to find @replayio/playwright");
  }

  // launch a replay browser
  const { getExecutablePath } = require(replayPlaywrightPath);
  const chromiumPath =
    process.env.REPLAY_CHROMIUM_EXECUTABLE_PATH ||
    getExecutablePath("chromium");
  const firefoxPath =
    process.env.REPLAY_FIREFOX_EXECUTABLE_PATH || getExecutablePath("firefox");

  const browserName = chromiumPath ? "chrome" : firefoxPath ? "firefox" : null;

  if (!browserName) {
    throw new Error("Unable to find replay browser");
  }

  const { browser, context } = await launch({
    browser: browserName,
    executablePath: chromiumPath || firefoxPath,
    env: {
      ...process.env,
      DISPLAY: ":0.0",
      HOME: process.env.HOME,
      RECORD_ALL_CONTENT: 1,
    },
    headless: false,
    ...options,
  });

  // return browser and context
  return { browser, context };
}

async function uploadReplay(page) {
  const domain = await page.evaluate(() => window.location.origin);
  console.log("DOMAIN", domain);
  // list and upload the replay
  try {
    const filter = domain
      ? `--filter 'function($v){$contains($v.metadata.uri, ${JSON.stringify(
          domain
        )})}'`
      : "";
    console.log("Filter: ", filter);
    console.log(await runCommand(`npx @replayio/replay ls --json`));
    console.log(
      await runCommand(
        `npx @replayio/replay upload-all --api-key rwk_3MeVbcwczm1wS7ov5BCyzoUhj3YxBkivtdouy0IjiP1 ${filter}`,
        { logStderr: console.error.bind(console) }
      )
    );
  } catch (e) {
    console.error("ERROR UPLOADING REPLAY", e);
    throw e;
  }
}

async function logIn(options = {}) {
  const userNumber = options.userId || 1;
  const launchOptions = options.options || {};

  // log in by setting API key as HTTP header
  const { browser, context } = await launch({
    permissions: ["clipboard-read", "clipboard-write"],
    acceptDownloads: true,
    ...launchOptions,
  });
  await context.setExtraHTTPHeaders({
    Authorization: `Bearer ${process.env[`USER_${userNumber}_API_KEY`]}`,
  });
  const page = await context.newPage();
  await page.goto(buildUrl("/"));

  // go to your library
  await page.click("text=Your Library");

  return { browser, context, page };
}

async function logoutSequence(page) {
  await page.setExtraHTTPHeaders({ Authorization: "" });
  await page.waitForTimeout(1000);
  await page.click(':text("View settings")');
  await page.click(':text("Personal")');
  await page.click(':text("Log Out")');
  await page.waitForTimeout(5000);
}

async function logOut(page) {
  try {
    await expect(page.locator(':text("View settings")')).toBeVisible({
      timeout: 5000,
    });
    await logoutSequence(page);
  } catch {
    await page.click("button .arrowhead-right");
    await logoutSequence(page);
  }
}

async function logInToPinterest(context) {
  if (!context) {
    const replay = await launchReplay({ slowMo: 500 });
    context = replay.context;
  }

  // login to pinterest
  // const { context, browser } = await launch({ ...options });
  const page = await context.newPage();
  await page.goto("https://www.pinterest.com/login/");

  // fill in
  await page.fill(
    '[data-test-id="emailInputField"] #email',
    process.env.PINTEREST_EMAIL
  );
  await page.fill(
    '[data-test-id="passwordInputField"] #password',
    `${process.env.DEFAULT_PASSWORD}1`
  );
  await page.click('[data-test-id="registerFormSubmitButton"] :text("Log in")');

  // assert you're logged in
  await expect(
    page.locator('[data-test-id="addPinButton"] :text("Create")')
  ).toBeVisible();

  // close popup
  try {
    await page.click(':text("Skip for now")', { timeout: 4000 });
  } catch {}
  return { page, browser, context };
}

async function logInToLinkedin(context) {
  if (!context) {
    const replay = await launchReplay({ slowMo: 500 });
    context = replay.context;
  }

  // login to linkedin
  // const { context, browser } = await launch({ ...options });
  const page = await context.newPage();
  await page.goto("https://www.linkedin.com/login");

  // fill in
  await page.fill('[aria-label="Email or Phone"]', process.env.LINKEDIN_EMAIL);
  await page.fill('[aria-label="Password"]', process.env.LINKEDIN_PASSWORD);
  // Click the 'Sign in' button
  await page.click('[aria-label="Sign in"]');

  // assert you're logged in
  // await expect(
  //   page.locator('[data-test-id="addPinButton"] :text("Create")')
  // ).toBeVisible();

  return { page, browser, context };
}

async function logInToFacebook(email, password, context) {
  // go to Facebook landing page
  if (!context) {
    const replay = await launchReplay({
      slowMo: 500,
      proxy: {
        server: "44.213.56.128:3128",
      },
    });
    context = replay.context;
  }

  const page = await context.newPage();
  await page.goto("https://www.facebook.com");

  // log in as test user
  await page.fill(
    '[data-testid="royal_email"]',
    email || process.env.FACEBOOK_EMAIL
  );
  await page.fill(
    '[data-testid="royal_pass"]',
    password || process.env.FACEBOOK_PASSWORD
  );
  await page.click('[data-testid="royal_login_button"]');

  // wait for log in to succeed
  await assertElement(page, '[aria-label="Facebook"]');

  return { page };
}

function parseInviteUrl({ text }) {
  const inviteUrl = text
    .match(/Accept invitation: \S+/)[0]
    .split("Accept invitation: ")[1];
  console.log("INVITE URL", inviteUrl);

  return inviteUrl;
}

async function setFocus({ handleLocation, moveToX, page }) {
  let handle;
  if (handleLocation == "left") {
    handle = await page.locator(`.group .${handleLocation}-0`).first();
  } else {
    handle = await page.locator(`.group .${handleLocation}-0 >> nth=1`).first();
  }

  await handle.hover();
  await page.mouse.down();
  await page.waitForTimeout(500);
  await page.mouse.move(moveToX, 672, { steps: 50 });
  await page.waitForTimeout(500);
  await page.mouse.up();
  await page.waitForTimeout(500);
}

function waitForFrameNavigated(url) {
  return (page) =>
    new Promise((resolve) => {
      const fn = async (frame) => {
        const frameUrl = await frame.url();
        if (
          url ||
          (url instanceof RegExp ? url.test(frameUrl) : frameUrl.includes(url))
        ) {
          page.off("framenavigated", fn);
          resolve(frame);
        }
      };

      page.on("framenavigated", fn);
    });
}

async function logInToAsana(email, password) {
  // nav to asana landing page
  const { context, browser } = await launchReplay({ slowMo: 1000 });
  const page = await context.newPage();
  await page.goto("https://app.asana.com/-/login");

  // login
  // await page.waitForTimeout(3000);
  // await page.click('[href="https://app.asana.com/-/login"]');
  // await page.fill('[placeholder="name@company.com"]', email);
  await page.fill(".LoginEmailForm-emailInput", email);
  await page.click(".LoginEmailForm-continueButton");
  await page.fill('[type="password"]', password);
  await page.click(".LoginPasswordForm-loginButton");

  // assert dashboard
  await expect(page.locator(".GlobalTopbar-asanaLogo")).toBeVisible({
    timeout: 60000,
  });

  return { page, browser };
}

async function deleteAllSuperblocks(page) {
  await page.click('[data-test="editor-left-nav-navigation"]');
  var allComponents = page.locator(
    '[data-test="global-nav-item-context-menu"]'
  );
  while (await allComponents.count()) {
    await page.click('[data-test="global-nav-item-context-menu"] >> nth = 0');
    await page.click('span:text-is("Delete"):visible');
    await page.waitForTimeout(2000);
  }
}

// async function logInToAirtable(options = {}) {
// TODO: use launchReplay
//   const { browser } = await launch({...options});
//   const context = await browser.newContext()
//   const page = await context.newPage();
//   await page.goto('https://airtable.com/login');

//   try{
//     await expect(page.locator("#passwordLogin")).toBeVisible({ timeout: 3000 });
//     await page.fill("#emailLogin", process.env.AIRTABLE_EMAIL);
//     await page.fill("#passwordLogin", process.env.AIRTABLE_PASSWORD);
//     await page.click('[type="submit"]');
//     await expect(page.locator('[aria-label="Workspaces sidebar"]')).toBeVisible();
//   } catch {
//     await browser.close()
//     const { browser } = await launch();
//     const context = await browser.newContext()
//     const page = await context.newPage();
//     await page.goto('https://airtable.com/login');
//     await page.fill("#emailLogin", process.env.AIRTABLE_EMAIL);
//     await page.fill("#passwordLogin", process.env.AIRTABLE_PASSWORD);
//     await page.click('[type="submit"]');
//     await expect(page.locator('[aria-label="Workspaces sidebar"]')).toBeVisible();
//   }

//   return { page, browser, context }
// }

async function logInToAirtable(options = {}) {
  const { context, browser } = await launchReplay({ ...options });
  const page = await context.newPage();
  await page.goto("https://airtable.com/login");

  await page.fill("#emailLogin", process.env.AIRTABLE_EMAIL);
  try {
    await page.click(':text("Continue")', { timeout: 5000 });
  } catch {}
  await page.fill("#passwordLogin", process.env.AIRTABLE_PASSWORD);
  await page.click('[type="submit"]');
  await expect(page.locator('[aria-label="Workspaces sidebar"]')).toBeVisible();

  return { page, browser, context };
}

async function getBoundingBox(page, selector) {
  const handle = await page.waitForSelector(selector);
  const box = await handle.boundingBox();
  return { x: box.x + box.width / 2, y: box.y + box.height / 2 };
}

async function addElementToCanvas(page, element_selector) {
  // go to Design tab
  await page.click('.tabs-1:has-text("Design")');

  // add element to canvas
  await page.click(element_selector);
  await page.click(".Page");
}

async function logInToSurveymonkey(options = {}) {
  const { context, browser } = await launchReplay({ ...options });
  const page = await context.newPage();
  await page.goto("https://surveymonkey.com/login");

  await page.fill('[type="email"]', process.env.SURVEYMONKEY_EMAIL);
  await page.click(':text("Next")');
  await page.fill("#password", process.env.SURVEYMONKEY_PASSWORD);
  await page.click(':text("Log In")');

  // cookies popup
  try {
    await expect(
      page.locator('[aria-label="This site uses cookies"]')
    ).toBeVisible({ timeout: 7000 });
    await page.click("#onetrust-accept-btn-handler");
  } catch (e) {}
  // zoom popup
  try {
    await expect(page.locator('[aria-label="Zoom Promo Modal"]')).toBeVisible({
      timeout: 10000,
    });
    await page.click(".ucs-carousel__close");
    await page.click('[aria-label="No thanks"]');
  } catch (e) {}
  // new homepage popup
  try {
    await expect(
      page.locator(
        "text=We’re testing a new homepage format, and we want you to be one of the first SurveyMonkey users to try it"
      )
    ).toBeVisible({ timeout: 6000 });
    await page.click('footer [type="button"]');
  } catch (e) {}

  return { page, browser, context };
}

async function logInToEtsy(options = {}) {
  const { context, browser } = await launch({ ...options });
  const page = await context.newPage();

  // nav to site
  await page.goto("https://etsy.com/");

  // sign in
  await page.click(':text("Sign in")');
  await page.fill('[name="email"]', process.env.ETSY_EMAIL);
  await page.fill('[name="password"]', process.env.ETSY_PASSWORD);
  await page.click('[name="submit_attempt"]');
  await expect(page.locator(':text("Wolfie!") >> nth=0')).toBeVisible();

  return { page, browser, context };
}

async function createSurveyFromScratch(page) {
  // await page.click('[data-testid="mm-header"] [title="My Surveys"]');
  await page.click(':text("CREATE SURVEY")');
  await page.click(
    '[data-testid="CreateSurvey__Content"] :text("Start from scratch")'
  );
  await page.waitForTimeout(1000);
  const sName = `QA Survey ` + Date.now().toString().slice(-4);
  await page.click('[data-testid="StartFromScratchModalBody__SurveyTitle"]');
  await page.keyboard.type(sName, { delay: 100 });
  await page.selectOption(
    '[data-testid="StartFromScratchModalBody__SurveyCategory"]',
    "14"
  );
  await page.waitForTimeout(1000);
  await page.click(
    '[data-testid="CreateSurvey__Content"] [data-testid="StartFromScratchModalFooter__CreateSurveyButton"]'
  );
  await expect(page.locator(`:text("${sName}")`)).toHaveCount(2);
  await page.fill("#editTitle", "Test Question");
  await page.click("#changeQType");
  await page.click('[data-action="SingleTextboxQuestion"]');
  await page.click('[href="#"].save');
  await page.waitForTimeout(2000);
  return sName;
}

async function cleanSurveys(page) {
  const oldSurvey = page.locator(
    '[class*="projectCard-"]:visible:has-text("QA Survey")'
  );

  while (await oldSurvey.count()) {
    await oldSurvey.last().locator("button").click();
    await page.click('button:has-text("Delete")');
    await page.click('[role="dialog"] button:has-text("Delete")');
    await page.waitForTimeout(6000);
  }
}

async function openPopup(page, selector) {
  var [popup] = await Promise.all([
    page.waitForEvent("popup", { timeout: 100000 }),
    page.click(selector),
  ]);
  await popup.waitForLoadState("domcontentloaded");
  await popup.bringToFront();

  return popup;
}

async function deleteSurvey(page, name) {
  const deleteSurveyItem = await page.locator(
    // `.survey-row:has-text("${name}")`
    `.survey-item:has-text("${name}")`
  );

  // await deleteSurveyItem.first().locator(":text('.Options')").scrollIntoViewIfNeeded()
  // await deleteSurveyItem.first().locator(":text('.Options')").click();
  await deleteSurveyItem
    .first()
    .locator(".more-options")
    .scrollIntoViewIfNeeded();
  await deleteSurveyItem.first().locator(".more-options").click();
  await page.click(':text-is("Delete"):visible');
  await page.click(':text-is("DELETE"):visible');

  // await page.click(`:text(". Copy of ${name}")`);
  // await page.click('li:nth-of-type(6) [data-action="delete"]');
  // await page.click(".open .delete-survey");
}

// used for deleting all icons, shapes, buttons etc in Bubble editor
async function selectAllDelete(page) {
  await page.waitForTimeout(5000);
  await page.click(".Page"); // focus editor
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");
}

async function deleteIdeaPin(page, title) {
  await page.click(
    '[data-test-id="button-container"] [aria-label="Accounts and more options"]'
  );
  await page.click('[data-test-id="HeaderAccountsOptionsMenuAccountRep"]');
  await page.click('[data-test-id="action-bar"] :text("Created")');
  await page.click(`[aria-label*="${title}"]`, { position: { x: 50, y: 50 } });
  await page.hover('[data-test-id="profile-header"]');
  await page.click(`[aria-label*="${title}"]`, { position: { x: 50, y: 50 } });
  await page.click(
    '[data-test-id="closeup-action-bar-button"] [aria-label="More options"]'
  );
  await page.click('[data-test-id="pin-action-dropdown-edit-pin"]');

  // delete pin
  await page.click('[data-test-id="delete-pin-button"] :text("Delete")');
  await page.click('[data-test-id="confirm-delete-pin"] :text("Delete")');
}

async function deleteEvenFlows(page) {
  // go to workflow
  await page.click(".tabs-2:has-text('Workflow')");

  // get number of events
  var numberOfEvents = page.locator(".token-box.grey");

  // while there are events in workflow tab
  // delete them
  while (await numberOfEvents.count()) {
    await page.locator(".token-box.grey").first().click();
    await page.click(".event-selected .delete");
    await page.waitForTimeout(1000);
  }

  // assert all events deleted
  await expect(page.locator(".token-box.grey")).not.toBeVisible();
}

async function deletePin(page, title) {
  await page.click(`:text("${title}")`);
  await page.click(
    '[data-test-id="closeup-action-bar-button"] [aria-label="More options"]'
  );
  await page.click('[data-test-id="pin-action-dropdown-edit-pin"]');
  await page.waitForTimeout(2000);
  await page.click('[data-test-id="delete-pin-button"] :text("Delete")', {
    force: true,
  });
  try {
    await page.click('[data-test-id="confirm-delete-pin"] :text("Delete")', {
      timeout: 5000,
    });
  } catch {}
}
// old deleteSurvey function
async function deleteSurvey2(page, name) {
  const deleteSurveyItem = page.locator(
    // `[class*="survey-row"]:visible:has-text("${name}")`
    `:text("${name}")`
  );
  await deleteSurveyItem.first().locator(".survey-actions").click();
  await page.click('[data-action="delete"]:visible');
  await page.click(".open .delete-survey");
}

// log into bubble
async function bubbleLogin(options = {}) {
  // launch with replay
  const { browser, context } = await launchReplay(options);

  // add logged in state and navigate to bubble
  context.addCookies(JSON.parse(process.env.GOOGLE_COOKIES_BUBBLE));
  const page = await context.newPage();
  await page.goto("https://bubble.io");

  // close tell us a bit about yourself modal if neede
  try {
    await expect(
      page.locator(':text("Tell us a little bit about you!")')
    ).toBeVisible({ timeout: 5000 });
    await page.click(':text("close")');
  } catch {}

  return { browser, context, page };
}

function extractAppAndPageFromUrl(pageUrl) {
  const appName = pageUrl.split("/version-test/")[0].split("/").at(-1);
  const pageName = pageUrl.split("/version-test/")[1].split("?")[0];

  return { appName, pageName };
}

async function navigateTo(page, project) {
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(`[href*="${project}"] >> nth = 0`),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();

  return { page2 };
}

// superblocks login
async function superblocksLogin(options = {}) {
  const { browser, context } = await launchReplay(options);

  // navigate to superblocks
  const page = await context.newPage();
  await page.goto("https://login.superblocks.com/u/login");

  // enter email
  await page.fill("#username", process.env.SUPERBLOCKS_EMAIL);
  await page.click(':text-is("Continue")');

  // enter password
  await page.fill("#password", process.env.SUPERBLOCKS_PASSWORD);
  await page.click(':text-is("Continue")');

  // assert we're redirected to the homepage
  await expect(
    page.locator(':text("Welcome, Replay+superblocks")')
  ).toBeVisible();

  // return everything
  return { browser, context, page };
}

async function dragAndDrogPdf(
  page,
  elementSelector,
  filePath,
  fileName,
  fileType
) {
  let rawBuffer = await fse.readFile(filePath);
  let buffer = rawBuffer.toString("base64");

  // prepare the data to transfer
  const dataTransfer = await page.evaluateHandle(
    async ({ bufferData, fileName, fileType }) => {
      const dt = new DataTransfer();

      const blobData = await fetch(bufferData).then((res) => res.blob());

      const file = new File([blobData], fileName, { type: fileType });
      dt.items.add(file);
      return dt;
    },
    {
      bufferData: `data:application/octet-stream;base64,${buffer}`,
      fileName: fileName,
      fileType: fileType,
    }
  );

  // Now dispatch
  await page.dispatchEvent(elementSelector, "drop", { dataTransfer });
}

async function downloadS3File(page, file) {
  const extension = file.split(".")[1];
  const fileUrl = `https://qawolf-customer-assets.s3.us-east-2.amazonaws.com/pequity/${file}`;
  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.goto(fileUrl).catch(() => {}),
  ]);

  const path = await download.path();
  if (extension) {
    const newPath = `/tmp/${faker.random.alphaNumeric()}.${extension}`;
    await fse.rename(path, newPath);
    return newPath;
  }

  return path;
}

async function builderLogin(options = {}) {
  // launch replay browser
  const { browser, context } = await launchReplay(options);
  const page = await context.newPage();

  // Navigate to https://builder.io/login
  await page.goto("https://builder.io/login");

  // REQ Log into Builder.io
  // Fill the Work Email input with BUILDERIO_EMAIL
  await page.fill(
    '[data-test-id="login-email-input"] [placeholder="stephanie@mycompany.com"]',
    "jabersami+replay@gmail.com"
  );

  // Fill the Password input with BUILDERIO_PASSWORD
  await page.fill(
    '[data-test-id="login-password-input"] [placeholder="••••••••••"]',
    "v2ajdbguH23XUnLR"
  );

  // Click the 'Submit' button
  await page.click('[data-test-id="login-submit-button"]');

  // Assert Able to log into builder.io
  await expect(
    page.locator(
      '[src="https://cdn.builder.io/static/media/builder-logo.bff0faae.png"]'
    )
  ).toBeVisible();

  return { context, page };
}

async function twitterLogin(options = {}) {
  // launch replay browser
  const { browser, context } = await launchReplay(options);
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
  await expect(
    page.locator('[data-testid="AppTabBar_Home_Link"]')
  ).toBeVisible();

  // REQ Navigate thru Twitter home
  // Click the 'Home' button
  await page.click('[data-testid="AppTabBar_Home_Link"]');

  return { page, context, browser };
}

async function editTwitterProfile(page) {
  // edit profile
  await page.click(':text("Edit profile")');

  // Fill Name with new value
  await page.fill('[name="displayName"]', "QA Wolf Replay Test");

  // Fill Bio with new value
  await page.fill(':text("Test Bio")', "Test Bio");

  // Fill Location with new value
  await page.fill('[name="location"]', "123 California Rd");

  // Fill Website with new value
  await page.fill('[name="url"]', "https://www.google.com/");

  // Click the 'Save' button
  await page.click('[data-testid="Profile_Save_Button"]');
}

async function slackLogin(options = {}) {
  // launch replay browser
  const { browser, context } = await launchReplay({
    ...options,
  });
  const page = await context.newPage();

  // Navigate to slack
  await page.goto("https://slack.com/signin#/signin");
  await page.waitForTimeout(7000);

  // Log into Slack
  await page.fill('[data-qa="email_field"]', process.env.SLACK_EMAIL);

  // Click the 'Sign In With Email' button
  const after = new Date();
  await page.click('[data-qa="submit_button"]');

  // Enter 6-character code sent to email
  const { waitForMessage } = getInbox({ id: "slack" });
  const { subject, urls, text } = await waitForMessage({ after });
  const code = subject.slice(-7);
  const firstThreeCode = code.slice(0, 3);
  const lastThreeCode = code.slice(-3);
  await page.fill(
    '[data-qa="confirmation_code_input"] [aria-label="digit 1 of 6"]',
    firstThreeCode[0]
  );
  await page.fill(
    '[data-qa="confirmation_code_input"] [aria-label="digit 2 of 6"]',
    firstThreeCode[1]
  );
  await page.fill(
    '[data-qa="confirmation_code_input"] [aria-label="digit 3 of 6"]',
    firstThreeCode[2]
  );
  await page.fill(
    '[data-qa="confirmation_code_input"] [aria-label="digit 4 of 6"]',
    lastThreeCode[0]
  );
  await page.fill(
    '[data-qa="confirmation_code_input"] [aria-label="digit 5 of 6"]',
    lastThreeCode[1]
  );
  await page.fill(
    '[data-qa="confirmation_code_input"] [aria-label="digit 6 of 6"]',
    lastThreeCode[2]
  );

  // wait for page to load
  await page.waitForTimeout(10 * 1000);

  // open slack in new page
  const url = page.url();
  const slackPage = await context.newPage();
  await slackPage.goto(url);
  await page.close();

  // Assert Able to log into slack workspace
  await expect(
    slackPage.locator('[data-qa="team-menu-trigger"]')
  ).toBeVisible();
  return { slackPage, context };
}

async function resetSlackProfile(page) {
  await page.fill('[data-qa="slack_kit_scrollbar"] #real_name-input', fullName);
  await page.fill("#display_name-input", displayName);
  await page.fill('[data-qa="slack_kit_scrollbar"] #title-input', title);
  await page.fill(
    '[data-qa="slack_kit_scrollbar"] #name_pronunciation-input',
    pronounciation
  );
  await page.click('[data-qa="edit_profile_modal"] :text("Save Changes")');
}

function bubbleUrl(app, page) {
  return `${process.env.DEFAULT_URL}site/${app}/version-test/${page}?${
    process.env.QUERY_STRING || ""
  }`;
}

function extractAppAndPageFromUrl(pageUrl) {
  const appName = pageUrl.split("/version-test/")[0].split("/").at(-1);
  const pageName = pageUrl.split("/version-test/")[1].split("?")[0];

  return { appName, pageName };
}

/**
 * On editor: goes to workflow tab ->
 * adds new event ->
 * adds new action to new event
 */
async function addEventAddAction(
  page,
  eventType,
  eventName,
  actionType,
  actionName
) {
  // go to workflow tab
  await page.click(".tabs-2:has-text('Workflow')");

  // add event
  await page.click("text=Click here to add an event...");
  await page.hover(`text='${eventType}'`);
  await page.click(`text='${eventName}'`);

  // add action -> add action name
  await page.click("text=Click here to add an action...");
  await page.hover(`text='${actionType}'`);
  await page.click(`.actions .item:has-text('${actionName}')`);
}

module.exports = {
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
};
