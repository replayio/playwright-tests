const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1500
  });
  const context = await browser.newContext();
  // Open new page
  const page = await context.newPage();

  // Go to https://www.google.com/?gws_rd=ssl
  await page.goto('https://www.google.com/?gws_rd=ssl');

  // Click [aria-label="Search"]
  await page.click('[aria-label="Search"]');

  // Fill [aria-label="Search"]
  await page.fill('[aria-label="Search"]', 'playwright');

  // Press Enter
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.google.com/search?source=hp&ei=ULRQYNqWBKvClwT0hJPQAw&iflsig=AINFCbYAAAAAYFDCYN_JI80suMmApm3WCP0dFY7GMp5o&q=playwright&oq=playwright&gs_lcp=Cgdnd3Mtd2l6EAMyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAMgIIADICCAAyAggAOggIABDqAhCPAToFCC4QkwI6CAgAELEDEIMBOgUIABCxAzoFCC4QsQM6CAguEMcBEK8BOgQIABAKUKAsWNFHYIlZaAFwAHgAgAH0AYgB6RGSAQQyLTEwmAEAoAEBqgEHZ3dzLXdperABCg&sclient=gws-wiz&ved=0ahUKEwja_uqa97TvAhUr4YUKHXTCBDoQ4dUDCAc&uact=5' }*/),
    page.press('[aria-label="Search"]', 'Enter')
  ]);

  // Click [aria-label="Listen"]
  await page.click('[aria-label="Listen"]');

  // Click text=Images
  await page.click('text=Images');

  // assert.equal(page.url(), 'https://www.google.com/search?q=playwright&source=lnms&tbm=isch&biw=1280&bih=720');
  // Go to https://www.google.com/search?q=playwright&source=lnms&tbm=isch&biw=1280&bih=720
  await page.goto('https://www.google.com/search?q=playwright&source=lnms&tbm=isch&biw=1280&bih=720');
  // Click text=News
  await page.click('text=News');

  // assert.equal(page.url(), 'https://www.google.com/search?q=playwright&source=lmns&tbm=nws&bih=720&biw=1280&hl=en-US&sa=X&ved=2ahUKEwjC-Iym97TvAhUR4RoKHcIoDRIQ_AUoAnoECAEQAg');
  // Go to https://www.google.com/search?q=playwright&source=lmns&tbm=nws&bih=720&biw=1280&hl=en-US&sa=X&ved=2ahUKEwjC-Iym97TvAhUR4RoKHcIoDRIQ_AUoAnoECAEQAg
  await page.goto('https://www.google.com/search?q=playwright&source=lmns&tbm=nws&bih=720&biw=1280&hl=en-US&sa=X&ved=2ahUKEwjC-Iym97TvAhUR4RoKHcIoDRIQ_AUoAnoECAEQAg');
  // Click text=Books
  await page.click('text=Books');

  // assert.equal(page.url(), 'https://www.google.com/search?q=playwright&hl=en-US&tbm=bks&source=lnms&biw=1280&bih=720&dpr=1');
  // Go to https://www.google.com/search?q=playwright&hl=en-US&tbm=bks&source=lnms&biw=1280&bih=720&dpr=1
  await page.goto('https://www.google.com/search?q=playwright&hl=en-US&tbm=bks&source=lnms&biw=1280&bih=720&dpr=1');
  
  // Click div[role="button"]:has-text("More")
  await page.click('div[role="button"]:has-text("More")');

  await page.waitForTimeout(2000);
 
  await context.close();
  await browser.close();
})();