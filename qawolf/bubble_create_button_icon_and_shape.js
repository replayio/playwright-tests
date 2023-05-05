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
  // bubble log in
  const { context, page, browser } = await bubbleLogin();
  
  // navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "testing-buttonsreplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  // REQ Create and preview button
  // select button and create on page
  await page2.click(':text("Button") >> nth=0');
  await page2.mouse.click(350, 70);
  
  // assert element created
  await assertText(page2, "...edit me...");
  await assertElement(page2, "button");
  
  // enter button name
  await page2.dblclick(':text("...edit me...Insert dynamic data")');
  await page2.fill(".text-entry input", "I am a button");
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  await previewPage.waitForTimeout(3000);
  previewPage.close();
  
  page2.bringToFront();
  
  // REQ Delete button
  // Click the created Button
  await page2.click('button:has-text("I am a button")');
  
  // Press the Delete key
  await page2.keyboard.press("Delete");
  
  // Assert able to delete Button
  await expect(
    page2.locator('button:has-text("I am a button")')
  ).not.toBeVisible();
  
  // REQ Create and preview icon
  await page2.click(':text("Icon") >> nth=0');
  await page2.mouse.click(350, 70);
  
  // assert element created
  await assertElement(page2, "button svg");
  
  // Select Icon under Appearance
  await page2.click(".dropdown-option >> nth=0");
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  await previewPage.waitForTimeout(3000);
  previewPage.close();
  
  // REQ Delete icon
  // Click the created Icon
  await page2.click("button svg");
  
  // Press the Delete key
  await page2.keyboard.press("Delete");
  
  // Assert Able to delete Icon
  await expect(page2.locator("button svg")).not.toBeVisible();
  
  // REQ Create and delete shape
  // Click the 'Shape' Button
  // Drag Shape across canvas
  await page2.click(':text("Shape") >> nth=0');
  await page2.mouse.click(350, 70);
  
  // wait for preview to update
  await page2.waitForTimeout(3000);
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  await previewPage.waitForTimeout(3000);
  previewPage.close();
  
  // REQ Delete shape
  // Click the created Shape
  await page2.click(".Shape >> nth=0");
  
  // Press the Delete key
  await page2.keyboard.press("Delete");
  
  // Assert Able to delete Shape
  await expect(page2.locator(".element.selected")).not.toBeVisible();
  
  await page2.waitForTimeout(1000);
  
  // REQ Call uploadReplay helper
  await uploadReplay();
  

  process.exit();
})();