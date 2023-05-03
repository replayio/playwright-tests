const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // login
  const { page } = await logInToAsana(
    process.env.ASANA_EMAIL,
    process.env.ASANA_PASSWORD
  );
  
  // handle trial modal if present
  try {
    await expect(page.locator("text=Your trial ends in")).not.toBeVisible({
      timeout: 5000,
    });
  } catch {
    await page.click(':text("Skip for now")');
  }
  
  // nav to first test project -> dashboard
  await page.click(':text("First Test Project")');
  await page.click('a:has-text("Dashboard")');
  await expect(page.locator(':text("Add chart")')).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // clean test if needed
  while (await page.locator("text=QA Chart").count()) {
    await page.hover(`:text('QA Chart')`);
    await page.waitForTimeout(1000);
    await page.click(
      `[class*="ThemeableCardPresentation"]:has-text("QA Chart") div[aria-label="More actions"].SubtleIconButton >> nth = 0`
    );
    await page.click(':text("Remove chart")');
    await expect(
      page.locator("text=Are you sure you want to remove this chart?")
    ).toBeVisible();
    await page.click(".DangerButton");
    await page.waitForTimeout(1000);
  }
  
  // add dashboard chart
  const chartName = `QA Chart ` + Date.now().toString().slice(-4);
  await page.click(':text("Add chart")');
  await page.fill('[placeholder="Total tasks by Priority"]', chartName);
  await page.click(".ChartDialogFooter .PrimaryButton");
  
  // assert chart
  await expect(page.locator(`text=${chartName}`)).toBeVisible({
    timeout: 60 * 1000,
  });
  
  // delete chart
  await page.hover(`:text('${chartName}')`);
  await page.waitForTimeout(1000);
  await page.click(
    `[class*="ThemeableCardPresentation"]:has-text("${chartName}") div[aria-label="More actions"].SubtleIconButton >> nth = 0`,
    {
      delay: 500,
    }
  );
  await page.click(':text("Remove chart")');
  await expect(
    page.locator("text=Are you sure you want to remove this chart?")
  ).toBeVisible();
  await page.click(".DangerButton");
  
  // assert chart deleted
  await expect(page.locator(`text=${chartName}`)).not.toBeVisible({
    timeout: 60 * 1000,
  });
  
  // upload replay
  await uploadReplay();

  process.exit();
})();