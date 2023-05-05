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
  bubbleLogin,
  superblocksLogin,
  navigateTo,
  openPopup
} = require("./helpers");

(async () => {
  // REQ471 Surveymonkey: Login
  const { page } = await logInToSurveymonkey();
  
  // REQ476 Surveymonkey: Can't create a survey from template
  await page.click(':text("Create Survey")');
  await page.click('[data-testid="CreateSurvey__Content"] :text("Start from template")');
  await page.click('[data-testid="CreateSurvey__Content"] [data-testid="SurveyTemplateTile_Container"]');
  await page.click('[data-testid="FullScreenModal__Container"] [type="button"] [aria-label="ArrowRight"]');
  await expect(page.locator('[data-testid="CreateSurvey__Content"] :text("Paid Templates")')).toBeVisible();
  await expect(page.locator('text=UPGRADE')).toHaveCount(3);
  await page.click('[data-testid="CreateSurvey__Content"] footer [type="button"]');
  await expect(page.locator('text=Choose a plan that works for you')).toBeVisible();
  
  // upload replay
  await uploadReplay();

  process.exit();
})();