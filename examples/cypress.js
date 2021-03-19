const { firefox } = require("playwright");
//const browserSession = require("../session.json");

async function test() {
  const browser = await firefox.launch({ 
    slowMo: 50,
    headless:false,
  });

  const context = await browser.newContext();//{ storageState: browserSession }
  const page = await context.newPage();

  const url = "https://dashboard.cypress.io/projects/7s5okt/runs";

  await page.goto(url);

  await page.click("a.run-list-item");
  await page.click('[data-cy="test-overview-test-link"]');
  await page.click(".test-results__test-result-title-container");

  await page.waitForTimeout(1000);
  await browser.close();
}

test();
