const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10, options: { slowMo: 1000 } });
  await assertText(page, "Library");
  
  // go to recording
  await page.click(':text("Test Permissions")');
  await page.click(':text("React DevTools Recording")');
  
  // assert recording loaded
  await assertText(page, "React DevTools Recording");
  await assertText(page, "Viewer");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, "Console");
  await assertNotText(page, "(index)");
  
  // expand demo file
  const indexFile = page.locator("text=(index)");
  const scriptFile = page.locator(
    '[role="tree"] :text("demo-script.js")'
  );
  await expect(indexFile).not.toBeVisible();
  await expect(scriptFile).not.toBeVisible();
  await page.click("text=demo");
  
  // assert demo file expanded
  await expect(indexFile).toBeVisible();
  await expect(scriptFile).toBeVisible();
  
  // open index file
  await assertNotText(page, "    <title>Your first replay</title>");
  await indexFile.click();
  
  // assert index file opened
  await assertText(page, "    <title>Your first replay</title>");
  
  // open demo-script.js
  await assertNotText(
    page,
    "const log = (callback) => setTimeout(callback, 100);"
  );
  await scriptFile.click();
  
  // assert demo-script.js opened
  await assertText(page, "const log = (callback) => setTimeout(callback, 100);");
  
  await logOut(page);
  

  process.exit();
})();