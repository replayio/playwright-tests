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
  // launch replay browser
  const { browser, context } = await launchReplay();
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto("https://react-charts.tanstack.com/docs/overview");
  
  // navigate to example
  await page.click("text=Simple");
  
  // grab frame
  const frame = await(
    await page.waitForSelector('[title="tannerlinsley/react-charts: simple"]')
  ).contentFrame();
  
  // assert viewing frame
  await assertText(frame, "Line");
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();