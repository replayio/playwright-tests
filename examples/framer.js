const { example } = require("../src/helpers");

example("framer", async (page, { step }) => {
  await page.goto(
    "https://framer.com/projects/f0oJdIOO8ZLQ1iAkKfGX-hvjz5?node=JBLVglfFu-page"
  );

  await step("logging into google", async () => {
    await Promise.all([
      page.waitForNavigation(),
      page.click('text="Continue with Google"'),
    ]);

    await page.fill('input[aria-label="Email or phone"]', "test@replay.io");
    await page.click("//button[normalize-space(.)='Next']/div[2]");
    await page.press('input[aria-label="Enter your password"]', "Enter");
    await page.fill('input[aria-label="Enter your password"]', "ReplayTest123");
    await page.click("//button[normalize-space(.)='Next']/div[2]");
  });

  await page.waitForNavigation();
  await page.click('[test-id="layer-name-input"]');
});
