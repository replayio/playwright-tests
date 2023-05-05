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
  // log in
  const { browser, page } = await logIn({ userId: 6 });
  
  // open share recording modal
  await page.fill('[placeholder="Search"]', "Feb 2, 2023");
  await page.keyboard.press("Enter");
  await page.hover("text=Feb 2, 2023");
  await page.click('[data-test-id="consoleDockButton"]:has-text("more_vert")');
  // await page.click('[href="/recording/replay-with-logs--2e63ccb9-ada6-4d2a-a3a9-5d09d551e68d"] >> text=more_vert');
  await page.click('[role="menu"] >> text=Share');
  
  // assert share recording modal
  await assertText(page, "Add People");
  await assertText(page, "Author");
  // await assertText(page, "Privacy Settings");
  await assertText(page, "Copy URL");
  await assertText(page, "Only people with access can view");
  
  // clear leftover email invites
  const invitedEmail = page.locator(':text("replay+")');
  while (await invitedEmail.count()) {
    await invitedEmail.first().hover();
    await page.click(".delete");
    await page.waitForTimeout(1500);
  }
  
  // copy URL
  await page.click("text=Copy URL");
  await assertText(page, "Copied");
  const clipboardText = await page.evaluate(() => navigator.clipboard.readText());
  assert(clipboardText.includes("/recording/"));
  
  // share recording with email
  const { email, waitForMessage } = getInbox({ new: true });
  await page.fill('[placeholder="Email address"]', email);
  await page.keyboard.press("Enter");
  await assertText(page, "Invited");
  await assertText(page, email);
  
  // get recording link from email
  const { subject, urls } = await waitForMessage({ timeout: 5 * 60 * 1000 });
  assert(subject.includes("You've been invited"));
  const recordingUrl = urls.find((u) => u.includes(".app/r"));
  assert(recordingUrl);
  
  // TODO: view recording (requires being able to auth as arbitrary user)
  

  process.exit();
})();