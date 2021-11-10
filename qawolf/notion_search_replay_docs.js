const { assertElement, assertNotElement, assertNotText, assertText, faker, logInToFacebook } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch();
  const page = await context.newPage();
  await page.goto('https://www.notion.so/replayio/Replay-Docs-56758667f53a4d51b7c6fc7a641adb02');
  
  // assert page load
  await assertText(page, "Old Replay Docs");
  
  // search
  await page.click('.notion-topbar >> text="Search"');
  await page.fill('[type="text"]', "help");
  
  // assert serach option
  await assertText(page, "Troubleshooting", { selector: ".search-query-result-item" });
  
  // navigate to search results
  await page.click(".search-query-result-item:has-text('Troubleshooting')");
  
  // assert search results
  await assertText(page, "Troubleshooting ", { selector: '[placeholder="Untitled"]' });

  process.exit();
});