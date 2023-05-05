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
  // Open Replay Browser
  // Login to Builder
  const { page, context } = await builderLogin({ slowMo: 500 });
  
  // cleanup
  const projectName = "Create/Delete Project";
  try {
    await expect(page.locator(`:text("${projectName}")`)).toBeVisible({
      timeout: 10 * 1000,
    });
    await page.click(':text("Create/Delete Project")');
  
    // delete project
    await page.hover('[class*="sidebar-nav"]');
    await page.click(':text("Account Settings")');
  
    // Click the Meatball menu button
    await page.click('[data-test-id="router-container"] g');
  
    // Click on 'Archive'
    await page.click(':text("Archive")');
  
    // Click the 'Ok' button on modal
    await page.click('button :text("Ok")');
  
    // Assert:
    // Space is archived with 'This space is archived' msg
    await expect(page.locator(':text("This space is archived")')).toBeVisible();
  
    // navigate back to spaces
    await page.goto("https://builder.io/spaces");
  } catch {}
  
  // click 'New Space'
  await page.click(':text("New Space")');
  
  // enter space name
  await page.fill('[placeholder="e.g. My Great Project"]', projectName);
  await page.click(':text-is("Create")');
  
  // assert space is created
  await expect(page.locator(':text("Welcome to Builder")')).toBeVisible();
  await expect(page.locator(`:text("Let's get started")`)).toBeVisible();
  
  // Click the 'Try A Demo' button
  await page.click('[data-test-id="router-container"] :text("Try a demo")');
  await expect(page.locator(':text("Landing Page Demo")')).toBeVisible();
  
  // Select Landing Page Demo
  const [page2] = await Promise.all([
    page.waitForEvent("popup"),
    page.click(`:text("Landing Page Demo")`),
  ]);
  await page2.waitForLoadState("domcontentloaded");
  await page2.bringToFront();
  
  // Landing Page Demo Editor loads in different page
  await expect(page2.locator(':text("Sample Components")')).toBeVisible();
  await expect(page2).toHaveURL(/demo/);
  const framePage = page2.frameLocator('[name="preview-frame"]');
  const iconContainers = await framePage
    .locator('[class*="builder-block"] [class*="Icon_blobContainer"]')
    .count();
  
  // Act:
  // Drag a Sample component into builder
  await page2.click(':text("Icon component") >> nth=0');
  await page2.mouse.click(600, 400);
  await page2.mouse.click(600, 400);
  
  // Assert:
  // Able to add sample component into builder
  await expect(
    framePage.locator('[class*="builder-block"] [class*="Icon_blobContainer"]')
  ).toHaveCount(iconContainers + 1);
  
  // close landing page
  await page2.close();
  
  // Navigate to Space page
  await page.bringToFront();
  await page.click('[role="dialog"] [type="button"]');
  
  // Act:
  // Hover over Sidebar and click 'Account Settings'
  await page.hover('[class*="sidebar-nav"]');
  await page.click(':text("Account Settings")');
  
  // Click the Meatball menu button
  await page.click('[data-test-id="router-container"] g');
  
  // Click on 'Archive'
  await page.click(':text("Archive")');
  
  // Click the 'Ok' button on modal
  await page.click('button :text("Ok")');
  
  // Assert:
  // Space is archived with 'This space is archived' msg
  await expect(page.locator(':text("This space is archived")')).toBeVisible();
  
  await uploadReplay();
  

  process.exit();
})();