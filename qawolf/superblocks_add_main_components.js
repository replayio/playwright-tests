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
  // log into superblocks
  const { context, page, browser } = await superblocksLogin({ slowMo: 1000 });

  // close "upgrade plan" modal if it appears
  try {
    await page.click('[aria-label="Close"]', { timeout: 3000 });
  } catch {}

  // navigate into an application
  await page.hover(`[aria-label="replay+components"]`);
  await page.click('[data-test*="edit-app"] button:visible');
  await page.waitForTimeout(5000);

  // delete all components
  await deleteAllSuperblocks(page);

  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(3);

  // add a text component
  await page.click(':text-is("Text")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(550, 270);
  await page.mouse.up();

  // enter title
  await page.click('[data-test*="widget-Text"]');
  await page.click('[data-test="control-text"]');
  await page.keyboard.type("This is the Text Component title");
  await page.keyboard.press("Escape");

  // view component in preview
  var previewPage = await openPopup(page, "text=Preview");

  // assert text component shows correctly
  await expect(
    previewPage.locator(':text-is("This is the Text Component title")')
  ).toBeVisible();
  await previewPage.close();

  // delete component
  await deleteAllSuperblocks(page);

  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(3);

  // add a table component
  await page.click(':text-is("Table")');
  await page.mouse.down();
  await page.mouse.move(350, 170);
  await page.waitForTimeout(2000);
  await page.mouse.move(350, 170);
  await page.mouse.up();

  // assert table loads correctly
  await expect(page.locator(':text-is("photo") >> nth = 0')).toBeVisible();

  // view component in preview
  var previewPage = await openPopup(page, "text=Preview");

  // assert table component
  await expect(previewPage.locator(':text("Twitter")')).toBeVisible();
  await expect(previewPage.locator(':text("Name")')).toBeVisible();
  await expect(previewPage.locator(':text("Photo")')).toBeVisible();
  await previewPage.close();

  // delete component
  await deleteAllSuperblocks(page);

  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(3);

  // add a Button component
  await page.click(':text-is("Button")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(550, 270);
  await page.mouse.up();

  // enter button title
  await page.click('[data-test="control-text"]');
  await page.keyboard.type("This is the Button Component title");
  await page.keyboard.press("Escape");

  // view component in preview
  var previewPage = await openPopup(page, "text=Preview");

  // assert Button display correctly
  await expect(
    previewPage.locator(':text("This is the Button")')
  ).toBeVisible();
  await expect(
    previewPage.locator('button:has-text("This is the Button")')
  ).toBeEnabled();
  await previewPage.close();

  // delete component
  await deleteAllSuperblocks(page);

  // upload replay
  await uploadReplay(page);

  process.exit();
})();
