const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // test helpers
  var moveRecordingTo = async (page, location) => {
    await page.fill('[placeholder="Search"]', "Taylor Swift");
    await page.keyboard.press("Enter");
    await page.hover("text=Taylor Swift");
    await page.click("text=more_vert");
    await page.click(`[role="menu"] >> text=${location}`);
  };
  
  // log in
  const { page } = await logIn({ userId: 1});
  
  // go to test library
  await assertText(page, "Test team");
  await page.click("text=Test team");
  
  // ensure recording listed under test team
  try {
    await assertText(page, "Taylor Swift", { timeout: 10 * 1000 });
  } catch (e) {
    await page.click("text=Your Library");
    await moveRecordingTo(page, "Test team");
    await page.click('[title="Test team"]');
  };
  
  // move recording to library
  await moveRecordingTo(page, "Your Library");
  
  // assert recording moved to library
  // await assertText(page, "👋 This is where your replays will go!");
  await page.click("text=Your Library");
  await assertText(page, "Your Library");
  await assertText(page, "(1)");
  await assertText(page, "Taylor Swift");
  // move recording to test team
  await moveRecordingTo(page, "Test team");
  
  // assert recording moved to test team
  // await assertText(page, "👋 This is where your replays will go!");
  await page.click("text=Test team");
  const teamSpan = page.locator('span >> text=Test team');
  await expect(teamSpan).toHaveCount(1)
  await assertText(page, "(1)");
  await assertText(page, "Taylor Swift");

  process.exit();
})();