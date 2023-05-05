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
  // login
  const { email, waitForMessage } = getInbox({ new: true });
  const { page, browser } = await logInToAsana(
    process.env.ASANA_EMAIL,
    process.env.ASANA_PASSWORD
  );
  
  // add new user
  await page.click(':text("Create")');
  await page.click(".UserPlusIcon");
  await page.click("form");
  await page.keyboard.type(email);
  await page.waitForTimeout(3000);
  await page.click('[role="option"]', {force:true});
  await page.click(`.PrimaryButton:has-text("Send") >> nth=0`);
  
  // assert member
  await page.waitForTimeout(5000);
  await page.click(`:text("QA's First Team")`);
  await page.click(':text("Manage members")');
  await expect(page.locator(`text=${email}`)).toHaveCount(3);
  
  // remove member
  // await page.hover(`:text('${email}') >> nth=1`);
  await page.click(`[aria-label="Cancel invite"]:right-of(:text("${email}"))`);
  await page.click(':text("Remove Access")');
  await page.click('[aria-label="Close this dialog"]');
  
  // assert memeber deleted
  await page.click(':text("Manage members")');
  await expect(page.locator(`text=${email}`)).toHaveCount(0);
  
  // upload replay
  await uploadReplay();

  process.exit();
})();