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
  
  // launch page
  // const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://prosemirror.net/examples/basic/');
  
  // assert page loaded
  await assertText(page, "Documentation");
  
  // edit text
  await page.fill('[contenteditable="true"]', "This is a test");
  
  // select text
  await page.keyboard.down("Control");
  await page.keyboard.down("Shift");
  
  // highlight text
  for(let i = 0; i <= 4; i++) {
    await page.press('[contenteditable="true"]', "ArrowLeft");
  }
  
  // italicize text
  await page.click('[title="Toggle emphasis"]');
  
  // undo back to standard 
  await page.click('[title="Undo last change"]');
  
  // redo to italicized
  await page.click('[title="Redo last undone change"]');
  
  // list and upload the replay
  await uploadReplay();

  process.exit();
})();