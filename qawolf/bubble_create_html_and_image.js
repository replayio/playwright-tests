const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  
  // Navigate to App
  // navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "testing-buttonsreplay");
  
  // cleanup
  try {
      await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  
  // REQ Create and preview HTML document
  // Click the 'HTML' button
  // Drag HTML across canvas
  await page2.click('[element_name="HTML"]');
  await page2.mouse.click(350, 70);
  
  // Fill HTML Editor under Apperance
  await page2.fill("textarea", "<i>I am HTML</i>");
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  
  // Assert HTML elements/text display correctly
  await expect(previewPage.locator('text=I am HTML')).toBeVisible();
  
  await previewPage.waitForTimeout(3000);
  previewPage.close();
  
  page2.bringToFront();
  
  
  // REQ Delete HTML
  // Click the created HTML
  await page2.click('.HTML.selected');
  
  // Press the Delete key
  await page2.keyboard.press("Delete");
  
  // Assert Able to delete HTML
  await expect(page2.locator('.HTML.selected')).not.toBeVisible();
  
  
  
  // REQ Create and preview image
  // Click the 'Image' button
  // Drag Image across canvas
  await page2.click('[element_name="Image"]');
  await page2.mouse.click(350, 70);
  
  // Click the 'Upload' button and upload image
  const [fileChooser] = await Promise.all([
    page2.waitForEvent("filechooser"),
  
    // Opens the file chooser.
    await page2.click('[type="file"]'),
  ]);
  await fileChooser.setFiles("/root/files/qawolf.pdf");
  
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  
  // Assert Image loads correctly
  await expect(previewPage.locator(".bubble-element.Image >> nth=0")).toBeVisible();
  
  await previewPage.waitForTimeout(3000);
  previewPage.close();
  
  page2.bringToFront();
  
  // REQ Delete image
  // Click the created Image
  await page2.click('.page-element img');
  
  // Press the Delete key
  await page2.keyboard.press("Delete");
  
  // Assert Able to delete Image
  await expect(page2.locator('.page-element img')).not.toBeVisible();
  
  // REQ Call uploadReplay helper
  await uploadReplay();

  process.exit();
})();