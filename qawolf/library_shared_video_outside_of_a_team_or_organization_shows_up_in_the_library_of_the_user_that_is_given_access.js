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
  // log in to user 11  
  const { page } = await logIn({ userId: 11 });  
  await assertText(page, "Library");  
    
  // assert video from qa8 is in Library  
  await expect(page.locator(":text('Time Travel QA8')")).toBeVisible();  
  

  process.exit();
})();