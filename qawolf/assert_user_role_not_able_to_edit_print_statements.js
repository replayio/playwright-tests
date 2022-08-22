const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 7 }); // User
  // const { page } = await logIn({ userId: 10 }); // Developer
  await assertText(page, "Library");
  
  // go to recording
  await page.click("text=Test Permissions");
  await page.click("text=Time Travel");
  
  // assert recording loaded
  await assertText(page, "Time Travel");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await expect(page.locator(".console-panel-button")).toHaveCount(1);
  
  // open script.js file and breakpoint panel
  await page.click("text=Search for fileCtrl+P");
  await page.keyboard.type("s");
  await page.click('#result-list [role="option"]');
  await page.click("text=motion_photos_paused");
  
  // assert print statement panel opened
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).toBeVisible();
  
  // add print statement
  await page.hover("text=img.src = url", { force: true });
  await page.click(".toggle-widget");
  
  // assert print statement added
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).not.toBeVisible();
  // await expect(page.locator('text="preloadImage", 77:12')).toBeVisible();
  await expect(page.locator('text="preloadImage", 8')).toHaveCount(2);
  
  // assert unable to edit print statement
  await expect(page.locator('.text-gray-400')).toBeVisible();
  
  // delete print statement
  await page.hover('.text-gray-400', { force: true });
  await page.click(".toggle-widget");
  
  // assert print statement deleted
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).toBeVisible();
  await expect(page.locator('text="preloadImage", 8')).not.toBeVisible();
  

  process.exit();
})();