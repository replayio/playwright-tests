const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch replay browser
  const { browser, context } = await launchReplay();
  const page = await context.newPage();
  
  // nav to site
  await page.goto("https://etsy.com/");
  await expect(page.locator(':text("Popular gifts right now")')).toBeVisible();
  
  // REQ496 Etsy: Search and select suggestion
  await page.click("#global-enhancements-search-query");
  await page.keyboard.type("Y");
  await page.waitForTimeout(1000);
  const suggestion = await page.innerText("li >> nth=0");
  await page.click("li >> nth=0");
  await expect(page.locator(".listing-link >> nth=0")).toBeVisible();
  await page.waitForTimeout(3000); // wait for results
  let listingInnerText = (
    await page.innerText(".listing-link >> nth=0")
  ).toLowerCase();
  expect(listingInnerText).toContain(suggestion);
  
  // REQ497 Etsy: Search unique search terms
  // const searchTerm = "hello world"; // WAs probably too unique there were no matching results
  const searchTerm = "blue";
  
  await page.click(':text("Close search")');
  await page.keyboard.type(searchTerm);
  await page.keyboard.press("Enter");
  await expect(page.locator(".listing-link >> nth=0")).toBeVisible();
  listingInnerText = (
    await page.innerText(".listing-link >> nth=0")
  ).toLowerCase();
  expect(listingInnerText).toContain(searchTerm);
  
  // REQ498 Etsy: Search Trending Search Term
  await page.waitForTimeout(5000);
  const trending = (await page.innerText(".ingress-card >> nth=9"))
    .toLowerCase()
    .replace(searchTerm + " ", "");
  
  
  await page.click(".ingress-card >> nth=9"); // clicks the fourth suggestion
  await page.waitForTimeout(5000);
  await expect(page.locator(".listing-link >> nth=0")).toBeVisible();
  listingInnerText = (
    await page.innerText(".listing-link >> nth=0")
  ).toLowerCase();
  expect(listingInnerText).toContain(trending);
  
  // list and upload the replay
  await uploadReplay();
  

  process.exit();
})();