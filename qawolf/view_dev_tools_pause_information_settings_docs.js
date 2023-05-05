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
} = require("./helpers");

(async () => {
  //  launch page
  const { browser, context, page } = await logIn({ userId: 7 });

  // goto replay 'Greater Scott'
  await page.click("text=Greater Scott");

  // view DevTools
  await page.click("text=ViewerDevTools");

  // assert viewing DevTools
  await assertText(page, "Sources");

  // view pause information
  await page.click("text=motion_photos_paused");

  // assert viewing pause information
  await assertText(
    page,
    "Click on the \nadd\n in the editor to add a print statement"
  );

  // view settings
  await page.click("text=more_horiz");
  await page.click("text=Settings");

  // assert viewing settings
  await assertText(page, "Personal");

  // view API keys
  await page.click("text=API Keys");

  // assert viewing API keys
  await assertText(page, "API Keys allow you to upload");

  // view preferences
  await page.click("text=Preferences");

  // assert viewing preferences
  await expect(page.locator("main h1")).toHaveText("Preferences");

  // view experimental
  await page.click("text=Experimental");

  // assert viewing experimental
  await assertText(page, "Experimental");

  // view support
  //await page.click("li:nth-of-type(5) span:visible");
  await page.click("text=support");

  // assert viewing experimental
  await assertText(page, "Join us on Discord");
  await assertText(page, "Send us an email");

  // view legal
  await page.click("text=Legal");

  // assert viewing legal
  await assertText(page, "Terms of Use");
  await assertText(page, "Privacy Policy");

  // close settings
  await page.click(".close");

  // view docs
  await page.click("text=more_horiz");
  const [openTabs] = await Promise.all([
    context.waitForEvent("page"),
    await page.click("text=Docs"),
  ]);

  let tabs = openTabs.context().pages();

  // asserting viewing docs
  await assertText(tabs[1], "Get Started");
  await assertText(tabs[1], "Learn More");

  process.exit();
})();
