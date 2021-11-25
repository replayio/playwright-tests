const { assertElement,assertText,faker,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,logIn,logInToFacebook,parseInviteUrl,waitForFrameNavigated } = require("./helpers");

(async () => {
  // go to PixiJS
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://pixijs.io/examples/#/demos-basic/container.js');
  
  // view advanced demos
  await page.click('[data-section="demos-advanced"]');
  
  // go to slots example
  await page.click("text=Slots");
  await assertText(page, "Slots", { selector: "#example-title" });
  
  // spin slot machine
  await page.click("#Layer_1");
  await page.evaluate(() => {
    const content = document.querySelector(".main-content");
    content.scrollTo(0, 0);
  });
  await page.waitForTimeout(5000);
  
  // go to star warp example
  await page.click("text=Star Warp");
  await assertText(page, "Star Warp", { selector: "#example-title" });
  await page.waitForTimeout(5000);

  process.exit();
})();