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
  // log in
  const { page } = await logIn({ userId: 7 }); // User
  // const { page } = await logIn({ userId: 10 }); // Developer
  await assertText(page, "Library");
  
  // go to recording
  await page.click("text=Test Permissions");
  await page.click("text=Time Travel");
  
  // assert recording loaded
  await assertText(page, "Time Travel");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await expect(page.locator('[data-test-id="PanelButton-console"]')).toHaveText(
    "Console"
  );
  
  // open script.js file and breakpoint panel
  await page.keyboard.press("Control+P");
  await page.keyboard.type("s");
  await page.click('#result-list [role="option"]');
  await page.click("text=motion_photos_paused");
  
  // assert print statement panel opened
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).toBeVisible();
  
  // add print statement
  // await page.hover(".hit-markers", { force: true });
  await page.hover("text=img.src = url", { force: true });
  await page.click('[data-test-id="SourceLine-8"] [data-test-name="LogPointToggle"]');
  
  // assert print statement added
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).not.toBeVisible();
  await expect(page.locator('text="preloadImage", 8')).toHaveCount(2);
  
  // assert unable to edit print statement
  await expect(page.locator(".breakpoint-heading-label")).toBeVisible();
  
  // delete print statement
  await page.hover(".breakpoint-heading-label", { force: true });
  await page.click('[title="Remove all breakpoint from this source"]');
  
  // assert print statement deleted
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).toBeVisible();
  await expect(page.locator('text="preloadImage", 8')).not.toBeVisible();
  

  process.exit();
})();