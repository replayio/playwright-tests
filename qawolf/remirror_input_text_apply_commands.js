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
  await page.goto('https://remirror.io/');
  
  // assert page loaded
  await assertText(page, "Docs");
  
  // set input
  await page.type('[contenteditable="true"]',"@j");
  
  // select joe
  await page.press('[contenteditable="true"]',"Enter");
  
  // select text
  await page.keyboard.down("Shift");
  await page.keyboard.down("Control");
  await page.press('[contenteditable="true"]', "ArrowLeft");
  
  // bold text
  await page.click("[name='bold']")
  
  // unbold text
  await page.click("[name='bold']")
  
  // select text
  await page.keyboard.down("Shift");
  await page.keyboard.down("Control");
  await page.press('[contenteditable="true"]', "ArrowLeft");
  
  // underline text
  await page.click("[name='underline']");
  
  // remove underline
  await page.click("[name='underline']");
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();