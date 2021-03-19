const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:2000
  });
  // defining const //
  
  const wait={waitUntil:'load'};
  const context = await browser.newContext();
  
  

  // Open new page
  const page = await context.newPage();

  // openning atlassian webpage
  await page.goto('https://www.makeuseof.com/');//{waitUntil:'load'});
  //await page.wait;
  //await page.click('text= "TECH NEWS"'); // not working 
  await page.click('xpath=/html/body/div[2]/div[2]/header/div[2]/div/nav[1]/ul/li[1]/a');

  await page.hover('text="PC & Mobile"');
  //await page.waitForTimeout(2000);

  await page.hover('text="Lifestyle"');
  //await page.waitForTimeout(2000);

  await page.hover('text="Hardware"');
  //await page.waitForTimeout(2000);

  await page.hover('text="Free Stuff"');

  await page.hover('text="About"');

  //await page.click('text= "Videos"'); // NOT WORKING

  await page.click('xpath=/html/body/div[2]/div[2]/header/div[2]/div/nav[1]/ul/li[6]/a');

  await page.click('text="Hardware Reviews"');
  //console.log("1");

  var i =0;
  while (i<3){
  const pagedown= page.keyboard.press('PageDown');
  i++;
}
  

})();