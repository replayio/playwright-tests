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
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://finviz.com", { timeout: 60 * 1000 });

  // assert page loaded
  await assertText(page, "Screener");

  // SEVERE AMOUNT OF AD POPUPS

  // go to maps
  page.on("popup", (popup) => popup.dismiss());
  await page.click("text=Maps");
  await page.waitForTimeout();

  // click on MSFT
  await page.mouse.click(300, 300);

  // assert flyout modal opened
  await assertText(page, "TECHNOLOGY - SOFTWARE - INFRASTRUCTURE");
  await assertText(page, "Microsoft Corporation");

  // click bubbles
  await page.click("text=Bubbles");

  // assert bubbles loaded
  await assertText(page, "X AXIS");
  await assertText(page, "INDUSTRY");

  await page.mouse.move(200, 200);

  process.exit();
})();
