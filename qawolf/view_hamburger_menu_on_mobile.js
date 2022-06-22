const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // launch page
  const { context } = await launch({ ...devices["iPhone 8"] });
  const page = await context.newPage();
  await page.goto('https://www.replay.io/');
  
  // assert page looded
  await assertText(page, "Your time travel debugger");
  await assertText(page, "Record, Collaborate, Inspect");
  
  // open menu
  await page.click(".hamburger-wrapper-in");
  await page.waitForTimeout(1000); // give menu time to open
  
  // find location of each link
  var docsLink = page.locator('.navbar_links-and-button [href="https://docs.replay.io/"]');
  var docsLinkBounds = await docsLink.first().boundingBox();
  var pricingLink = page.locator('.navbar_links-and-button [href="/pricing"]');
  var pricingLinkBounds = await pricingLink.first().boundingBox();
  var hiringLink = page.locator('.navbar_links-and-button [href="/about#careers"]');
  var hiringLinkBounds = await hiringLink.first().boundingBox();
  var aboutLink = page.locator('.navbar_links-and-button [href="/about"]');
  var aboutLinkBounds = await aboutLink.first().boundingBox();
  var loginButton = page.locator('[href="https://app.replay.io/"].button');
  var loginButtonBounds = await loginButton.first().boundingBox();
  var socialsContainer = page.locator('.navbar_links-and-button .footer_social-grid');
  var socialsContainerBounds = await socialsContainer.first().boundingBox();
  
  // assert vertical layout
  expect(docsLinkBounds.y).toBeLessThan(pricingLinkBounds.y);
  expect(pricingLinkBounds.y).toBeLessThan(hiringLinkBounds.y);
  expect(hiringLinkBounds.y).toBeLessThan(aboutLinkBounds.y);
  expect(aboutLinkBounds.y).toBeLessThan(loginButtonBounds.y);
  expect(loginButtonBounds.y).toBeLessThan(socialsContainerBounds.y);

  process.exit();
})();