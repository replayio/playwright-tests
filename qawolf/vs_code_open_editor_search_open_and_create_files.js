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
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://vscode-web-test-playground.azurewebsites.net/');
  
  // continue to editor
  await page.click('text="Click to Continue"');
  
  // assert editor
  await assertText(page, "EXPLORER");
  
  // open file.html
  await page.click("text=file.html");
  
  // assert open file.html
  await assertText(page, "file.html", { selector: ".tab" });
  
  // open file.css
  await page.click("text=file.css");
  
  // assert open file.css
  await assertText(page, "file.css", { selector: ".tab" });
  
  // search files
  await page.click(".codicon-search-view-icon");
  await page.fill('[aria-label="Search: Type Search Term and press Enter to search"]', "store");
  
  // assert file search
  await assertText(page, "export var storeHouses = [6,13];", { selector: ".monaco-list" });
  
  // navigate to explorer view
  await page.click(".codicon-explorer-view-icon");
  
  // create new file
  await page.click('[title="New File"]');
  
  // enter new file name
  await page.fill('[aria-label="Type file name. Press Enter to confirm or Escape to cancel."]', "file.test");
  await page.press('[aria-label="Type file name. Press Enter to confirm or Escape to cancel."]', "Enter");
  
  // add content to new file
  await page.waitForSelector(".view-line");
  await page.type(".view-line", "This is a test");
  
  // close file
  await page.click('[aria-label="Tab actions"]:right-of(:text("file.test"))');
  
  // delete test file
  await page.click("text=file.test", { button: 'right' });
  await page.waitForSelector('[role="menu"]');
  await page.click('[aria-label="Delete Permanently"]');
  await page.waitForSelector('[role="application"]');
  await page.click('[title="Delete"]');
  
  // assert test file deleted 
  await assertNotText(page, "file.test");

  process.exit();
})();