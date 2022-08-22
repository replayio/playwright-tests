const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn({ userId: 10 });
  await assertText(page, "Library");
  
  // go to recording
  // await page.click(':text("Your Library settings")');
  await page.click("text=Time Travel QA8");
  
  // assert recording loaded
  await assertText(page, "Time Travel");
  await assertText(page, "DevTools");
  
  // go to DevTools
  await page.click("text=ViewerDevTools");
  
  // assert DevTools loaded
  await expect(page.locator(".console-panel-button")).toHaveCount(1);
  
  // open script.js file and breakpoint panel
  await page.click("text=Search for fileCtrl+P");
  await page.keyboard.type('s')
  await page.click('#result-list [role="option"]');
  await page.click("text=motion_photos_paused");
  
  // assert print statement panel opened
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).toBeVisible();
  
  // add print statement
  await page.hover("text=var img = new Image();", { force: true });
  await page.click(".toggle-widget");
  
  // assert print statement added
  await expect(
    page.locator(
      "text=Click on the \nadd\n in the editor to add a print statement"
    )
  ).not.toBeVisible();
  await expect(page.locator('text="preloadImage", 77:12')).toBeVisible();
  
  // assert able to edit print statement
  await page.hover('text=""preloadImage""');
  await page.click(".pencil");
  await page.keyboard.press("Backspace");
  const randomNum = Math.floor(Math.random() * 10);
  await page.keyboard.type(`${randomNum}`);
  await page.click(':text("Save")');
  expect(
    await page.locator(`text='${randomNum}'`).count()
  ).toBeGreaterThanOrEqual(1);
  
  // delete print statement
  await page.hover("text=var img = new Image();", { force: true });
  await page.click(".toggle-widget");
  
  // assert print statement deleted
  await expect(page.locator('text="preloadImage", 77:12')).not.toBeVisible();
  

  process.exit();
})();