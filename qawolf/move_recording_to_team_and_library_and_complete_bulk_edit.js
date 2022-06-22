const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { browser, page } = await logIn({ userId: 1 });
  await assertText(page, "Your Library");
  
  // assert replays to move are available
  try {
    await assertText(page, 'Facebook: comment counts include deleted comments', { timeout: 5 * 1000 });
    await assertText(page, 'Clade');
  } catch (e) {
    await page.click("text=Test team");
    // await page.click("text=Edit");
    // await page.click("//*[@id='app-container']/main/div[2]/div[2]/div[2]/div[2]/div/div[1]/input");
  
    try {
      await page.click('div:nth-of-type(3) [type="checkbox"]', { timeout: 5 * 1000 });
    } catch (e) {
      // await assertText(page, 'Edit'); // just to break exception
    } finally {
      await page.click(".material-icons-outlined");
      await page.click('[role="menu"] >> text=Library');
      await page.click("text=Your Library");
    };
  };
  
  // assert no checkboxes
  const checkbox1 = page.locator('div:nth-of-type(5) [type="checkbox"]');
  const checkbox2 = page.locator('div:nth-of-type(6) [type="checkbox"]');
  await expect(checkbox1).not.toBeVisible();
  await expect(checkbox2).not.toBeVisible();
  
  // click Edit button and assert checkboxes appeared
  await page.click("text=Edit");
  await expect(checkbox1).toBeVisible();
  await expect(checkbox2).toBeVisible();
  
  // select replays to move to Test team
  await checkbox1.click();
  await checkbox2.click();
  
  // assert checkboxes checked
  expect(await checkbox1.isChecked()).toBeTruthy();
  expect(await checkbox2.isChecked()).toBeTruthy();
  
  // move replays to Test team
  await page.click("text=expand_more2 items selected");
  await page.click('[role="menu"] >> text=Test team');
  await page.click("text=Done");
  
  // assert checkboxes hid
  await expect(checkbox1).not.toBeVisible();
  await expect(checkbox2).not.toBeVisible();
  
  // assert replays moved
  await assertNotText(page, 'Facebook: comment counts include deleted comments');
  await assertNotText(page, 'Clade');
  await page.click("text=Test team");
  await assertText(page, 'Facebook: comment counts include deleted comments');
  await assertText(page, 'Clade');
  
  // move replays back to library
  await page.click("text=Edit");
  await page.click("[type='checkbox']:left-of(:text('Facebook')) >> nth=0");
  await page.click("[type='checkbox']:left-of(:text('Clade')) >> nth=0");
  await page.click("text=expand_more2 items selected");
  await page.click('[role="menu"] >> text=Your library');
  
  // assert replays moved to library
  await page.click("text=Your Library");
  await assertText(page, 'Facebook: comment counts include deleted comments');
  await assertText(page, 'Clade');

  process.exit();
})();