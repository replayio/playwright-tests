const { firefox } = require("playwright");

(async () => {
  const browser = await firefox.launch({
    headless:false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://discord.com/channels/197038439483310086/733488538393510049
  await page.goto(
    "https://discord.com/channels/679875946597056683/805450902940811285"
  );

  // Click input[aria-label="Email or Phone Number"]
  await page.click('input[aria-label="Email or Phone Number"]');

  // Fill input[aria-label="Email or Phone Number"]
  await page.fill(
    'input[aria-label="Email or Phone Number"]',
    "info@replay.io"
  );

  await page.waitForTimeout(100);
  // Press Tab
  await page.press('input[aria-label="Email or Phone Number"]', "Tab");

  await page.waitForTimeout(100);
  // Fill input[aria-label="Password"]
  await page.fill('input[aria-label="Password"]', "stile-failing-cowl");

  await page.waitForTimeout(100);

  // Click //button[normalize-space(.)='Login']
  await page.click("//button[normalize-space(.)='Login']");

  // Click //div[normalize-space(@aria-label)='Explore Public Servers' and normalize-space(@role)='listitem']/*[local-name()="svg"]
  await page.click(
    "//div[normalize-space(@aria-label)='Explore Public Servers' and normalize-space(@role)='listitem']/*[local-name()=\"svg\"]"
  );
  // assert.equal(page.url(), 'https://discord.com/guild-discovery');

  // Click text="Music"
  await page.click('text="Music"');

  // Click //div[starts-with(normalize-space(.), 'ChilledCowThe friendliest community on Discord 🧡 Join now to meet amazing peopl') and normalize-space(@role)='button']/div[1]/div[1]/img
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://discord.com/channels/707230275175841915/812032733869244436' }*/),
    page.click(
      // error here //
      "//div[starts-with(normalize-space(.), 'ChilledCowThe friendliest community on Discord 🧡 Join now to meet amazing peopl') and normalize-space(@role)='button']/div[1]/div[1]/img"
    ),
  ]);

  // Click .close-hZ94c6 .contents-18-Yxp svg path
  await page.click(".close-hZ94c6 .contents-18-Yxp svg path");

  // Click text="🏆｜highlights"
  await page.click('text="🏆｜highlights"');
  // assert.equal(page.url(), 'https://discord.com/channels/707230275175841915/762741027475685436');
  // ---------------------
  await context.close();
  await browser.close();
})();
