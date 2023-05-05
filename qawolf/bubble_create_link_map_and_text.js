const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "Bubble: Create link, map and text";

  // bubble log in
  const { context, page, browser } = await bubbleLogin({ slowMo: 500 });
  
  /// navigate to project 'Testing Button:Replay'
  const { page2 } = await navigateTo(page, "replay-link-map-text");
  
  // cleanup
  try {
      await page2.click(':text("Cancel")');
  } catch {}
  await selectAllDelete(page2);
  
  // select link and create on page
  await page2.click(':text("Link")');
  await page2.mouse.down();
  await page2.mouse.move(550, 270);
  await page2.waitForTimeout(2000);
  await page2.mouse.up();
  await page2.waitForTimeout(2000);
  
  // set layout
  await page2.click(':text-is("Layout")');
  await page2.fill(".NumberBox >> nth = 0", "200");
  await page2.fill(".NumberBox >> nth = 1", "60");
  await page2.click(':text-is("Appearance")');
  
  // assert element created
  await expect(page2.locator(':text("...edit me...") >> nth = 0')).toBeVisible();
  await assertElement(page2, "a");
  
  // enter link name
  await page2.click(".clickable-area");
  
  await page2.fill("textarea", "I am a link");
  
  // wait for preview to update
  await page.waitForTimeout(3000);
  
  // select external page destination
  await page2.click(':text("Internal page")');
  await page2.click(':text("External URL")');
  
  // enter url
  await page2.click('[class*="text-entry"]:near(:text("Destination URL"))');
  await page2.keyboard.type("google.com");
  await page2.keyboard.press("Enter");
  
  // wait for preview to update
  await page.waitForTimeout(3000);
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  
  // open link page and assert we can see the url
  await previewPage.click(':text("I am a link")');
  await expect(previewPage).toHaveURL(/google.com/);
  await previewPage.close();
  
  // delete link
  await page2.keyboard.press('Escape')
  await selectAllDelete(page2);
  
  // select map and create on page
  await page2.click(':text("Map")');
  await page2.mouse.down();
  await page2.mouse.move(350, 70);
  await page2.waitForTimeout(2000);
  await page2.mouse.up();
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  
  // assert map is showing correctly
  await expect(page2.locator('[aria-label="Map"] >> nth = 0')).toBeVisible();
  await previewPage.close();
  
  // delete map
  await page2.keyboard.press('Escape')
  await selectAllDelete(page2);
  
  // select text and create on page
  await page2.click(':text("Text")');
  await page2.mouse.down();
  await page2.mouse.move(350, 70);
  await page2.waitForTimeout(2000);
  await page2.mouse.up();
  
  // set layout
  await page2.click(':text-is("Layout")');
  await page2.fill(".NumberBox >> nth = 0", "200");
  await page2.fill(".NumberBox >> nth = 1", "60");
  await page2.click(':text-is("Appearance")');
  
  // enter text name
  await page2.click(".clickable-area");
  await page2.fill("textarea", "Text component");
  await page2.waitForTimeout(2000);
  
  // view in preview
  var previewPage = await openPopup(page2, "text=Preview");
  
  // assert map is showing correctly
  await expect(previewPage.locator(':text("Text component")')).toBeVisible();
  await previewPage.close();
  
  // delete text
  await page2.keyboard.press('Escape')
  await selectAllDelete(page2);
  
  // upload replay
  await uploadReplay();
  

  process.exit();
})();