const shared = require("./helpers");
const { expect } = require("@playwright/test");
const { assertElement, assertText, getValue } = require("qawolf");
const faker = require("faker");
const { getInbox } = require("./getInbox");

(async () => {
  const TEST_NAME = "FinViz";

  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://finviz.com', {timeout: 60 * 1000});
  
  // assert page loaded
  await assertText(page, 'Screener');
  
  // SEVERE AMOUNT OF AD POPUPS
  
  // go to maps
  page.on('popup', popup => popup.dismiss());
  await page.click("text=Maps");
  await page.waitForTimeout();
  
  // click on MSFT
  await page.mouse.click(300, 300);
  
  // assert flyout modal opened
  await assertText(page, 'TECHNOLOGY - SOFTWARE - INFRASTRUCTURE');
  await assertText(page, 'Microsoft Corporation');
  
  // click bubbles
  await page.click("text=Bubbles");
  
  // assert bubbles loaded
  await assertText(page, 'X AXIS');
  await assertText(page, 'INDUSTRY');
  
  await page.mouse.move(200, 200);
  

  process.exit();
})();