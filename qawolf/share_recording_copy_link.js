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
  const { browser, page } = await logIn();
  
  // open share recording modal
  await page.fill('[placeholder="Search"]', "Facebook: friend");
  await page.hover("text=Facebook: friend");
  await page.click("text=more_vert");
  await page.click('[role="menu"] >> text=Share');
  
  // assert share recording modal
  await assertText(page, "Add People");
  await assertText(page, "Author");
  await assertText(page, "Privacy Settings");
  await assertText(page, "Copy Link");
  await assertText(page, "Anyone with the link can view");
  
  
  // // share recording with email
  // const { email, waitForMessage } = getInbox({ new: true });
  // await page.fill('[placeholder="Email address"]', email);
  // await page.keyboard.press("Enter");
  // await assertText(page, "Invited");
  // await assertText(page, email);
  
  // // get recording link from email
  // var { subject, urls } = await waitForMessage();
  // assert(subject.includes("You've been invited"));
  // const recordingUrl = urls.find(u => u.includes(".app/r"));
  // assert(recordingUrl);
  
  // // TODO: view recording (requires being able to auth as arbitrary user)

  process.exit();
})();