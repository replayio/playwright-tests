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
  // login
  const { page, browser } = await logInToAsana(
    process.env.ASANA_EMAIL,
    process.env.ASANA_PASSWORD
  );
  
  // create message
  await page.click(':text("Create")');
  await page.click(':text("Message")');
  try {
    await page.click(
      '[placeholder="Type the name of a team, a project, or people"]',
      { delay: 500, timeout: 5000 }
    );
    await page.type('[placeholder="Type the name of a team, a project, or people"]', "Asana");
    await page.click(':text("QWQA Wolfreplay+asana@qawolf.email")', { force: true });
  } catch {}
  
  const message = `Test Message ` + Date.now().toString().slice(-4);
  await page.fill('[aria-label="Edit message draft"]', message);
  await page.click(`.PrimaryButton:has-text("Send")`);
  
  // assert message
  await expect(page.locator("text=Sent message")).toBeVisible();
  await page.click(':text("message")');
  await expect(page.locator('[aria-label="Conversation Name"]')).toHaveText(
    message
  );
  
  // upload replay
  await uploadReplay();

  process.exit();
})();