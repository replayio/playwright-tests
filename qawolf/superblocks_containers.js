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
  // log into superblocks
  const { context, page, browser } = await superblocksLogin({ slowMo: 1000 });
  
  // close "upgrade plan" modal if it appears
  try {
    await page.click('[aria-label="Close"]', { timeout: 3000 });
  } catch {}
  
  // navigate into an application
  await page.hover(`[aria-label="replay+containers"]`);
  await page.click('[data-test*="edit-app"] button:visible');
  await page.waitForTimeout(5000);
  
  // delete all components
  await deleteAllSuperblocks(page);
  
  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(2);
  
  // add a modal container
  await page.click(':text-is("Modal")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(550, 270);
  await page.mouse.up();
  
  // enter title
  await page.click('[data-test*="widget-Text"]');
  await page.click('[data-test="control-text"]');
  await page.keyboard.type("This is the modal title");
  await page.keyboard.press("Escape");
  
  // view container in preview
  var previewPage = await openPopup(page, "text=Preview");
  
  // assert and click the modal button
  await expect(previewPage.locator(':text-is("Open Modal")')).toBeVisible();
  await previewPage.click(':text-is("Open Modal")');
  
  // assert modal opens as expected
  await expect(
    previewPage.locator(':text-is("This is the modal title")')
  ).toBeVisible();
  await expect(previewPage.locator('button :text("Cancel")')).toBeVisible();
  await expect(previewPage.locator('button :text("Confirm")')).toBeVisible();
  await previewPage.close();
  
  // delete component
  await deleteAllSuperblocks(page);
  
  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(2);
  
  // add a slideout container
  await page.click(':text-is("Slideout")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(550, 270);
  await page.mouse.up();
  
  // enter title
  await page.click('[data-test*="widget-Text"]');
  await page.click('[data-test="control-text"]');
  await page.keyboard.type("This is the Slideout title");
  await page.keyboard.press("Escape");
  
  // view container in preview
  var previewPage = await openPopup(page, "text=Preview");
  
  // assert and click the slideout button
  await expect(previewPage.locator(':text-is("Open Slideout")')).toBeVisible();
  await previewPage.click(':text-is("Open Slideout")');
  
  // assert slideout  opens as expected
  await expect(
    previewPage.locator(':text-is("This is the Slideout title")')
  ).toBeVisible();
  await previewPage.close();
  
  // delete component
  await deleteAllSuperblocks(page);
  
  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(2);
  
  // add a tabs container
  await page.click(':text-is("Tabs")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(550, 270);
  await page.mouse.up();
  
  // view container in preview
  var previewPage = await openPopup(page, "text=Preview");
  
  // assert both tabs display correctly
  await expect(previewPage.locator(':text("Tab 1")')).toBeVisible();
  await expect(previewPage.locator(':text("Tab 2")')).toBeVisible();
  await previewPage.close();
  
  // delete component
  await deleteAllSuperblocks(page);
  
  // upload replay
  await uploadReplay();
  

  process.exit();
})();