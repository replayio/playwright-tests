const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // login
  const { page, browser } = await logInToAsana(
    process.env.ASANA_EMAIL,
    process.env.ASANA_PASSWORD
  );
  
  // clean test
  while (await page.locator("text=QA Project").count()) {
    await page.click(`:text("QA Project")`);
    await page.click('[aria-label="Show options"]');
    await page.waitForTimeout(500);
    await page.click(':text("Delete project")');
    await page.waitForTimeout(500);
    await page.click(".DangerButton");
    await expect(page.locator('[role="alert"]')).toBeVisible();
    await page.click('[aria-label="Close this notification"]');
    await page.waitForTimeout(1000);
  }
  
  // create project
  await page.click(':text("Create")');
  await page.click(".ProjectIcon");
  await page.click(':text("Blank projectStart from scratch")');
  const projectName = `QA Project ` + Date.now().toString().slice(-4);
  await page.fill("#new_project_dialog_content_name_input", projectName);
  await page.click('.PotSetupFormStructure-submitButton [role="button"]');
  await page.click(':text("Go to project")');
  
  // assert project
  await expect(page.locator(`text=${projectName}`)).toHaveCount(2);
  
  // delete project
  await page.click('[aria-label="Show options"]');
  await page.click(':text("Delete project")');
  await page.waitForTimeout(500);
  await page.click(".DangerButton");
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await expect(page.locator(`text=${projectName}`)).toHaveCount(0);
  
  // upload replay
  await uploadReplay();
  

  process.exit();
})();