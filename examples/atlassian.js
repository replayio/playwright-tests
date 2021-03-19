const { firefox } = require('playwright');
(async () => {
  const browser = await firefox.launch({
    headless: false,
    slowMo:1000
  });
  // defining const //
  
  const wait={waitUntil:'load'};
  const context = await browser.newContext();
  
  

  // Open new page
  const page = await context.newPage();

  // openning atlassian webpage
  await page.goto('https://www.atlassian.com/');//{waitUntil:'load'});
  
  //await page.wait;

  // click the search icon
  await page.click('.global-nav--wac__search-icon');

  //input jira in search
  await page.fill('.global-nav--wac__search-input','Jira');

 //click the search submit button if selector error is not coming
 //await page.click('.global-nav--wac__search-submit');

 //press Enter if selector error is coming
 await page.keyboard.press('Enter');

    //await page.wait;

// click the link articles
await page.click('#wac-search__facet-list > li:nth-child(2) > a:nth-child(1)');

//await page.wait;

//pressing page down button 3 time in order to open a particular link 
var i =0;
while (i<3){
const pagedown= page.keyboard.press('PageDown');
i++;
}

// click another link with name Quri Portfolio for Jira case study
await page.click('text="Quri Portfolio for Jira case study"');

// waiting for page timeout inorder to stay at a page for a while
await page.waitForTimeout(2000);

//closing page,context and browser 
await page.close();
await context.close();
await browser.close();



})();