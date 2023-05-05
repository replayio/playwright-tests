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
  // const { browser, context } = await launchReplay();

  // log in to Facebook
  const { page } = await logInToFacebook(
    "qawreplayuser@gmail.com",
    "Replayfb-qaw1"
  );

  await assertText(page, "Richard Qaw");

  // go to ads manager
  await page.goto("https://facebook.com/adsmanager/manage");

  // view campaigns
  await page.click("#CAMPAIGN_GROUP_AdsClassicTab");

  // ensure campaign toggled on
  await assertText(page, "Test Campaign");
  const turnOnToggle = await page.$('#statusChangeNuxRoot [role="switch"]');
  if (turnOnToggle) turnOnToggle.click();

  // toggle campaign off
  await page.uncheck('[data-visualcompletion="ignore"] [type="checkbox"]');
  await page.hover('[data-visualcompletion="ignore"] [type="checkbox"]');
  await assertText(page, "Turn on campaign");

  // toggle campaign on
  await page.check('[data-visualcompletion="ignore"] [type="checkbox"]');
  await page.hover('[data-visualcompletion="ignore"] [type="checkbox"]');
  await assertText(page, "Turn off campaign");

  // list and upload the replay
  await uploadReplay(page);

  process.exit();
})();
