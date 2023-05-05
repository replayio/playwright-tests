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
  // open Eraser
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://app.tryeraser.com');
  
  // draw a box
  await page.click('[data-testid="whiteboard-container"] >> text=R');
  const whiteboard = await getBoundingClientRect('[data-testid="whiteboard-container"]')(page);
  await page.mouse.move(whiteboard.left + 100, whiteboard.top + 100);
  await page.mouse.down();
  await page.mouse.move(whiteboard.left + 200, whiteboard.top + 200, { steps: 20 });
  await page.mouse.up();
  
  // add title
  await page.click('#note-container [data-placeholder="Untitled File"]');
  await page.fill('#note-container [data-placeholder="Untitled File"]', "Replay Example");
  
  // add markdown
  const markdown = `## Here is some markdown
  > does it work?
  It _definitely_ does!`;
  await page.type('#note-container [aria-multiline="true"]', markdown);

  process.exit();
})();