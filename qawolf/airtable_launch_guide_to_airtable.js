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
  openPopup,
  runCommand
} = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // REQ305 Airtable: log in
  const { page } = await logInToAirtable();
  
  // REQ469 Airtable: View 'Guide to Airtable' from user dashboard
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(':text("Guide to Airtable")'),
  ]);
  
  await expect(page2).toHaveURL(/\/learning-and-resources/)
  await expect(page2.locator('text=Learning and resources')).toHaveCount(3);
  await expect(page2.locator("#doc_left_sidebar")).toBeVisible();
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();