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
  // log in
  // const { page } = await logIn({ userId: 6 }); // This is Chris Burton's ID - Just using it for maitnenance
  const { page } = await logIn({ userId: 10 }); // USE THIS ID FOR TESTING
  await assertText(page, "Your Library");
  
  // https://staging.app.replay.io/recording/react-devtools-recording--d91406a5-f662-470c-b360-662e827ed223?point=973555660975395472499928746426451&time=688&hasFrames=false
  
  
  
  // go to replay
  await page.click(':text("Test Permissions")');
  
  // open replay
  await page.click('[class*="Library_libraryRow"]:has-text("React DevTools")');
  await page.click("text=ViewerDevTools");
  
  // enter console evaluation
  await expect(page.locator("syntax-highlighted")).toBeHidden();
  await page.click('[data-test-id="ConsoleTerminalInput"]'); // console input
  await page.keyboard.type('window.document.querySelectorAll("button");');
  // await page.keyboard.type('window.document.querySelector("timeout");');
  await page.keyboard.press("Enter");
  
  // assert dev can use console evaluation
  await expect(
    page.locator('#toolbox-content-console :text("Loading")')
  ).not.toBeVisible({ timeout: 3 * 60 * 1000 });
  
  // Fails here: SyntaxError: missing ) in paranthetical
  await expect(
    page.locator('[data-test-name="Message"] :text("NodeList")')
  ).toBeVisible();
  
  await logOut(page);
  

  process.exit();
})();