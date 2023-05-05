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
  
  // REQ472 Surveymonkey: Logout
  expect(page.url()).toContain("dashboard");
  // await page.click('[aria-label="Open user menu"]');
  await page.click('[data-testid="mm-header"] [aria-label="Open User menu"]'); 
  // await page.click(':text("Sign Out")');
  await page.click('[data-testid="mm-header"] [href="/user/sign-out/?ut_source=header"]');
  
  expect(page.url()).not.toContain("dashboard");
  
  // upload replay
  await uploadReplay();

  process.exit();
})();