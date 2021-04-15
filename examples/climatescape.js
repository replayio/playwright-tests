const { example } = require("../src/helpers");

example("Explore climatescape.org", async (page, { action }) => {
  await page.goto("https://climatescape.org/");

  await action("Navigate to CIM", async (page) => {
    await page.click('text="Organizations"');

    await page.click('text="Buildings & Cities"');

    await page.click('text="HQ Location"');

    await page.click('text="Australia"');

    await page.click("text=/.*It uses the Internet of Things.*/");
  });

  await page.click('text="Energy Efficiency"');
});
