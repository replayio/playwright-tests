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
  // log in
  const { browser, page } = await logIn({ userId: 2 });
  await assertText(page, "Your Library");
  
  // go to team settings
  // await page.click('[title="Test Invite Team"]');
  await page.click(`:text("Test Invite Team")`)
  await page.click("text=settings");
  
  // assert settings loaded
  await page.click("text=Team Members");
  await assertText(page, 'replay+userrole@qawolf.email');
  
  // ensure replay+userrole@qawolf.email role set to Developer
  try {
    await assertNotText(page, 'User (pending)');
  } catch (e) {
    // change role to Developer
    await page.click('button:right-of(:text("replay+userrole@qawolf.email"))');
    await page.click(".permissions-dropdown-item >> text=Developer");
    await page.waitForTimeout(1500); // give role time to update
    await page.mouse.click(300, 300);
  };
  
  // change role to User 
  await page.click('button:right-of(:text("replay+userrole@qawolf.email"))');
  await page.waitForTimeout(1000);
  await page.click(".permissions-dropdown-item >> text=User");
  await page.waitForTimeout(1500); // give role time to update
  await page.mouse.click(300, 300);
  
  // assert role changed to user
  await assertText(page, "User (pending)", { selector: "text=mail_outlinereplay+userrole@qawolf.emailUser (pending)expand_more" });
  
  // change role to Developer
  await page.click('button:right-of(:text("replay+userrole@qawolf.email"))');
  await page.waitForTimeout(1000);
  await page.click(".permissions-dropdown-item >> text=Developer");
  await page.waitForTimeout(1500); // give role time to update
  await page.mouse.click(300, 300);
  
  // assert role changed to user
  await assertText(page, "Developer (pending)", { selector: "text=mail_outlinereplay+userrole@qawolf.emailDeveloper (pending)expand_more" });

  process.exit();
})();