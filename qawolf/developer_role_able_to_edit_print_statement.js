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
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("Test Permissions")');
  await page.click('[href="/recording/time-travel--ebf103b3-9b40-4d5b-a9f3-e0c8fe3d4bd5"]');
  await expect(page.locator("#video")).toBeVisible();
  
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
  // await page.click("text=Search for fileCtrl+P");
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
  await page.waitForTimeout(5000);
  await page.hover(':text("preloadImage")', { force: true });
  await page.hover("text=var img = new Image();", { force: true });
  await page.click('[data-test-name="LogPointToggle"]');
  
  // assert print statement added
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).not.toBeVisible();
  await expect(page.locator('text="preloadImage", 77:12')).toBeVisible();
  
  // assert able to edit print statement
  await page.hover('text=""preloadImage""');
  await page.click('[data-test-name="PointPanel-EditButton"]');
  await page.keyboard.press("Backspace");
  const randomNum = Math.floor(Math.random() * 10);
  await page.keyboard.type(`${randomNum}`);
  await page.click(':text("Save")');
  expect(
    await page.locator(`text='${randomNum}'`).count()
  ).toBeGreaterThanOrEqual(1);
  
  // delete print statement
  await page.hover("text=var img = new Image();", { force: true });
  await page.click('[data-test-name="LogPointToggle"]');
  
  // assert print statement deleted
  await expect(page.locator('text="preloadImage", 77:12')).not.toBeVisible();
  

  process.exit();
})();