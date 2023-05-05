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
  // When maintenance is done, please revalidate this bug: https://app.qawolf.com/bug-reports/cl7qxj3nj437235un5mejea99y
  
  // launch page
  const { browser, context, page } = await logIn({ userId: 1 });
  const after = new Date();
  
  // go to replay
  await page.goto(
    buildUrl(
      "/recording/99215af1-7f6f-4db2-84e4-7a2ea6142240?point=32127336818069823763437554336007621&time=16223&hasFrames=false"
    )
  );
  
  // assert page loaded
  await assertText(page, "sample-folder");
  
  // reload the page if no share button (not signed in)
  try {
    await expect(page.locator(':text("ios_shareShare")')).toBeVisible();
  } catch {
    await page.reload();
    await page.waitForSelector(':text("ios_shareShare")', { timeout: 15 * 1000 }); //share button
  }
  
  // share replay
  await page.click("text=ios_shareShare");
  
  // ensure invite email deleted
  await page.waitForTimeout(2000);
  const invitedEmail = page.locator("text=replay+invite");
  while (await invitedEmail.count()) {
    await invitedEmail.first().hover();
    await page.click(".close:visible");
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(10 * 1000); // give server time to clear all data from their DB
  
  const { email, waitForMessage } = getInbox({ id: "invite" });
  
  // add email
  await page.fill('[placeholder="Email address"]', email);
  
  // submit email
  await page.press('[placeholder="Email address"]', "Enter");
  
  // get invite information from email
  const { subject, text } = await waitForMessage({
    after,
    timeout: 5 * 60 * 1000,
  });
  const inviteUrl = text.match(/View Replay: \S+/)[0].split(": ")[1];
  assert(subject.includes("You've been invited to view sample-folder"));
  
  // go to Replay link
  const context2 = await browser.newContext();
  const page2 = await context2.newPage();
  await page2.bringToFront();
  await page2.goto(inviteUrl);
  
  // assert opened replay
  await page2.waitForSelector("text=sample-folder");
  
  // close page
  await page2.close();
  
  // delete user invitee
  await assertText(page, "Add People");
  await page.hover("text=replay+invite@qawolf.email");
  await page.click(".close");
  
  // assert invite deleted
  await page.waitForTimeout(5000);
  await assertNotText(page, email);
  
  // copy link
  await page.click("text=Copy Link");
  
  // get copied text
  var clipLink = await page.evaluate(() => {
    return navigator.clipboard.readText();
  });
  
  // go to copied invite link
  const context3 = await browser.newContext();
  const page3 = await context3.newPage();
  await page3.bringToFront();
  await page3.goto(clipLink);
  
  // assert opened replay
  await page3.waitForSelector("text=sample-folder");
  

  process.exit();
})();