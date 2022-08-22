const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn();
  
  // open share recording modal
  await page.fill('[placeholder="Search"]', "sample-folder");
  await page.hover("text=sample-folder");
  await page.click("text=more_vert");
  await page.click('[role="menu"] >> text=Share');
  
  // assert share recording modal
  await assertText(page, "Add People");
  await assertText(page, "Author");
  await assertText(page, "Privacy Settings");
  await assertText(page, "Copy Link");
  await assertText(page, "Anyone with the link can view");
  
  // copy link
  await page.click("text=Copy Link");
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
  var { subject, urls } = await waitForMessage({ timeout: 5 * 60000});
  assert(subject.includes("You've been invited"));
  const recordingUrl = urls.find(u => u.includes(".app/r"));
  assert(recordingUrl);
  
  // TODO: view recording (requires being able to auth as arbitrary user)

  process.exit();
})();