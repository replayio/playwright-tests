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
  const { context, page, browser } = await bubbleLogin({ slowMo: 500 });
  
  // navigate to project 'testing-iconsreplay'
  const { page2 } = await navigateTo(page, "testing-iconsreplay");
  
  // cleanup
  try {
    await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
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
  
  // assert icon is present
  await expect(previewPage.locator("button.bubble-element.Icon")).toBeVisible();
  
  // close preview
  previewPage.close();
  
  // REQ Delete icon
  // Click the created Icon
  await page2.click("button svg");
  
  // Press the Delete key
  await page2.keyboard.press("Delete");
  
  // Assert Able to delete Icon
  await expect(page2.locator("button svg")).not.toBeVisible();
  
  // upload replay
  await uploadReplay();
  

  process.exit();
})();