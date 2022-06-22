const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // Accordian being added to panes: https://github.com/RecordReplay/devtools/commit/1ec81567e36edfe5be1a980ade1ae030d4ab7163
  // update when feature is added
  
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click('[title="Test Permissions"]');
  await page.click('text=Great Scott');
  await page.click('text=DevTools');
  await page.waitForTimeout(5000); // give DevTools time to fully load
  
  // assert DevTools loaded
  await assertText(page, 'Great Scott');
  await assertText(page, 'Network');
  
  // ensure sources list panel is closed
  const sources = page.locator('.sources-list');
  try {
    await expect(sources).not.toBeVisible();
  } catch (e) {
    await page.click("text=description");  
    await expect(sources).not.toBeVisible();
  };
  
  // open sources from search for anything tool
  await page.click("text=Open Sources");
  
  // assert sources list panel opened
  await expect(sources).toBeVisible();
  
  // close panel for next test
  const outline = page.locator('.outline-filter');
  await page.click("text=description");
  await expect(outline).not.toBeVisible();
  
  // open outline from search for anything tool
  await page.click("text=Open Outline");
  await page.click("text=demo");
  await page.click("text=demo-script.js");
  
  // assert outline pane opened
  await expect(outline).toBeVisible();

  process.exit();
})();