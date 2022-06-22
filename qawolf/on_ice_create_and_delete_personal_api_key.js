const { assert,assertElement,assertText,expect,faker,getInbox,getValue,launch,assertNotElement,assertNotText,buildUrl,deleteTeam,getBoundingClientRect,getPlaybarTooltipValue,logIn,logInToFacebook,parseInviteUrl,setFocus,waitForFrameNavigated } = require("./helpers");

(async () => {
  // log in
  const { page } = await logIn();
  
  // open API key settings
  await page.click("text=View settings");
  await page.click("text=API Keys");
  
  // create API key
  const apiKey = `${faker.commerce.productMaterial()} ${Date.now()}`;
  await page.fill('[placeholder="API Key Label"]', apiKey);
  await page.click("text=Add");

  process.exit();
})();