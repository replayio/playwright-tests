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
} = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://dashboard.cypress.io/projects/7s5okt/runs", {
    timeout: 5 * 60 * 1000,
  });

  // navigate to test
  await page.click('[data-cy="commit-info"]');

  // assert navigate to test
  await assertText(page, "Run duration");

  // navigate to test results
  await page.click("text=Test Results");

  // assert navigate to test results
  await assertText(page, "Execution order");

  // open spec
  await page.click(".test-results__test-result");

  // expand runtime enviroment
  await page.click('[data-cy="collapsing-header"] >> text=Runtime environment');

  // assert expand runtime enviornment
  await assertText(page, "Run Group");
  await assertText(page, "Operating System");

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
