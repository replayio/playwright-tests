const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1000
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://phemex.com/
  await page.goto('https://phemex.com/');

  // Click text= Join A Team >> i
  await page.click('text= Join A Team >> i');

  // Click a:has-text("Buy Crypto")
  await page.click('a:has-text("Buy Crypto")');

  // assert.equal(page.url(), 'https://phemex.com/buy-crypto');
  // Click text=BTC Bitcoin 
  await page.click('text=BTC Bitcoin ');

  // Click text=ETH Ethereum >> img[alt="Coin"]
  await page.click('text=ETH Ethereum >> img[alt="Coin"]');

  // assert.equal(page.url(), 'https://phemex.com/buy-crypto?amount&currency=ETH&fiat=USD&payment=VISA');
  // Click text=USD  >> span
  await page.click('text=USD  >> span');

  // Click text=EUR
  await page.click('text=EUR');

  // assert.equal(page.url(), 'https://phemex.com/buy-crypto?amount&currency=ETH&fiat=EUR&payment=VISA');
  // Click [placeholder="0.00"]
  await page.click('[placeholder="0.00"]');

  // Fill [placeholder="0.00"]
  await page.fill('[placeholder="0.00"]', '12');

  // Click text=VISA 
  await page.click('text=VISA ');

  // Click text=MasterCard
  await page.click('text=MasterCard');

  // assert.equal(page.url(), 'https://phemex.com/buy-crypto?amount=12&currency=ETH&fiat=EUR&payment=MASTER');
  // Click text=Buy Now
  await page.click('text=Buy Now');

  // Click [placeholder="0.00"]
  await page.click('[placeholder="0.00"]');

  // Fill [placeholder="0.00"]
  await page.fill('[placeholder="0.00"]', '50');

  // Click text=Buy Now
  await page.click('text=Buy Now');

  // Click text=
  await page.click('text=');
  await page.waitForTimeout(2000)
  // ---------------------
  await context.close();
  await browser.close();
})();