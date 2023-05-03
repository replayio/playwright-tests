const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log into superblocks
  const { context, page, browser } = await superblocksLogin({ slowMo: 1000 });
  
  // close "upgrade plan" modal if it appears
  try {
    await page.click('[aria-label="Close"]', { timeout: 3000 });
  } catch {}
  
  // navigate into an application
  await page.hover(`[aria-label="Replay+superblocks's Awesome App"]`);
  await page.click('[data-test*="edit-app"] button:visible');
  await page.waitForTimeout(5000);
  
  // delete all components
  await page.click('[data-test="editor-left-nav-navigation"]');
  var allComponents = page.locator('[data-test="global-nav-item-context-menu"]');
  while (await allComponents.count()) {
    await page.click('[data-test="global-nav-item-context-menu"] >> nth = 0');
    await page.click('span:text-is("Delete"):visible');
    await page.waitForTimeout(2000);
  }
  
  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(2);
  
  // use a form
  await page.click(':text-is("Form")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(550, 270);
  await page.mouse.up();
  
  // enter title
  await page.click('[data-test*="widget-Text"]');
  await page.click('[data-test="control-text"]');
  await page.keyboard.type("This is the form title");
  await page.keyboard.press("Escape");
  
  // view form in preview
  var previewPage = await openPopup(page, "text=Preview");
  
  // assert form
  await expect(
    previewPage.locator(':text("This is the form title")')
  ).toBeVisible();
  await expect(previewPage.locator('button :text("Reset")')).toBeVisible();
  await expect(previewPage.locator('button :text("Submit")')).toBeVisible();
  await previewPage.close();
  
  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(2);
  
  // add input
  await page.click(':text-is("Input")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(500, 200);
  await page.mouse.up();
  
  // enter the label
  await page.click('[data-test="control-label"] span span');
  await page.keyboard.type("This is the input title");
  await page.keyboard.press("Escape");
  
  // view form in preview
  var previewPage = await openPopup(page, "text=Preview");
  
  // assert we can see both form and input
  await expect(
    previewPage.locator(':text("This is the form title")')
  ).toBeVisible();
  await expect(
    previewPage.locator(':text("This is the Input title")')
  ).toBeVisible();
  await previewPage.close();
  
  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(2);
  
  // add input
  await page.click(':text-is("Dropdown")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(500, 300);
  await page.mouse.up();
  
  // enter the label
  await page.click('[data-test="control-label"]');
  await page.keyboard.type("Dropdown Title");
  await page.keyboard.press("Escape");
  
  // view form in preview
  var previewPage = await openPopup(page, "text=Preview");
  
  // assert we can see both form and input
  await expect(
    previewPage.locator(':text("This is the form title")')
  ).toBeVisible();
  await expect(
    previewPage.locator(':text("This is the Input title")')
  ).toBeVisible();
  await expect(previewPage.locator(':text("Dropdown Title")')).toBeVisible();
  await previewPage.close();
  
  // click add components button
  await page.click('[data-test="components-sidebar-icon"]');
  await expect(page.locator(':text("Components")')).toHaveCount(2);
  
  // add input
  await page.click(':text-is("Checkbox")');
  await page.mouse.down();
  await page.mouse.move(550, 270);
  await page.waitForTimeout(2000);
  await page.mouse.move(500, 380);
  await page.mouse.up();
  
  // enter the label
  await page.click('[data-test="control-label"]');
  await page.keyboard.type("Checkbox Title");
  await page.keyboard.press("Escape");
  
  // view form in preview
  var previewPage = await openPopup(page, "text=Preview");
  
  // assert we can see both form and input
  await expect(
    previewPage.locator(':text("This is the form title")')
  ).toBeVisible();
  await expect(
    previewPage.locator(':text("This is the Input title")')
  ).toBeVisible();
  await expect(previewPage.locator(':text("Dropdown Title")')).toBeVisible();
  await expect(previewPage.locator(':text("Checkbox Title")')).toBeVisible();
  await previewPage.close();
  
  // upload preview
  await uploadReplay();
  

  process.exit();
})();