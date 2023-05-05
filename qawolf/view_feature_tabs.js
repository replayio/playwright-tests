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
  // go to home page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://replay.io");

  // assert page loaded
  await assertText(page, "Login");

  // skip animation
  await page.mouse.wheel(0, 2000);
  await page.click(".button_tertiary-inverted-alt__DdhdD");
  await page.waitForTimeout(4000);
  await page.mouse.wheel(0, 2000);

  // THE BELOW NOW AUTOMATICALLY SCROLL THROUGH, NO CLICKING NEEDED

  // assert viewing Print Statements
  await expect(
    page.locator(
      ':text("Add print statements and view the logs immediately in the Console.")'
    )
  ).toBeVisible({ timeout: 30000 });

  // assert viewing console
  await expect(
    page.locator(
      ':text("Fast forward to console logs and evaluate expressions in the Terminal.")'
    )
  ).toBeVisible({ timeout: 30000 });

  // assert viewing react
  await expect(
    page.locator(
      ':text("Inspect React components and view their state, props, and hooks.")'
    )
  ).toBeVisible({ timeout: 30000 });

  // assert viewing Elements
  await expect(
    page.locator(
      ':text("Inspect DOM elements and view their applied rules and computed properties.")'
    )
  ).toBeVisible({ timeout: 30000 });

  // assert viewing network
  await expect(
    page.locator(
      '.md span:has-text("Inspect Network requests and view their headers, request and response bodies.") >> nth=1'
    )
  ).toBeVisible({ timeout: 30000 });

  // assert viewing debugger
  await expect(
    page.locator(
      ':text("Pause at a line of code and view the call stack and scopes.")'
    )
  ).toBeVisible({ timeout: 30000 });

  process.exit();
})();
