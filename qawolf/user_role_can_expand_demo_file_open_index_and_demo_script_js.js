const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 });
  await assertText(page, 'Library');
  
  // go to recording
  await page.click(`:text("Test Permissions")`);
  await page.click('text=Permissions: Great Scott');
  
  // assert recording loaded
  await assertText(page, 'DevTools');
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await assertText(page, 'Console');
  await assertNotText(page, '(index)');
  
  // expand demo file
  const indexFile = page.locator('text=(index)');
  const scriptFile = page.locator('div:nth-of-type(1) .node >> text=demo-script.js');
  await expect(indexFile).not.toBeVisible();
  await expect(scriptFile).not.toBeVisible();
  await page.click("text=demo");
  
  // assert demo file expanded
  await expect(indexFile).toBeVisible();
  await expect(scriptFile).toBeVisible();
  
  // assert demo-script.js opened
  await expect(page.locator(':text("const log = (callback) => setTimeout(callback, 100);")')).toBeVisible();
  // await expect(page.locator('text=export async function setupDemo() {')).toBeVisible();
  
  // open index file
  await assertNotText(page, "    <title>Your first replay</title>");
  await indexFile.click();
  
  // assert index file opened
  await expect(page.locator(':text("<title>Your first replay</title>")')).toBeVisible();

  process.exit();
})();