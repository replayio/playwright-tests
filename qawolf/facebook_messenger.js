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
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // log in to Facebook
  const { page } = await logInToFacebook(
    process.env.FACEBOOK_EMAIL_5,
    process.env.FACEBOOK_PASSWORD_5
  );
  
  // open messenger
  await page.click('[aria-label="Messenger"]');
  await assertText(page, "See all in Messenger");
  await expect(page.locator('[aria-label="See all in Messenger"]')).toBeVisible();
  
  // view all in messenger
  await page.click("text=See all in Messenger");
  
  // view chat conversations
  await assertText(page, "Mark");
  
  // send message
  const message = faker.hacker.phrase();
  await page.fill('[aria-label="Message"]', message);
  await page.click('[aria-label="Press Enter to send"]');
  await page.hover(
    '[tabindex="0"][data-scope="messages_table"][data-release-focus-from="CLICK"] >> nth=-1'
  );
  console.log(message);
  // await page.click('[aria-label="Choose an emoji"]');
  try {
    await page.click('[aria-label="React"] >> nth=-1');
  } catch {
    await page.hover(
      '[tabindex="0"][data-scope="messages_table"][data-release-focus-from="CLICK"] >> nth=-1'
    );
    await page.click('[aria-label="React"] >> nth=-1');
  }
  
  // await page.click('[aria-label="Smileys & People"] [role="button"]');
  await page.click('[role="menuitem"]');
  await expect(page.locator('[aria-label="1 reaction; see who reacted to this"][tabindex="0"]')).toBeVisible();
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();